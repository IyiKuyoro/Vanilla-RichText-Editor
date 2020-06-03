class CustomImageUploadAdapter {
  constructor(url, loader) {
    this.loader = loader;
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const fd = new FormData();
          this.xhr.open('POST', this.url, true);
          // this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

          // Hookup an event listener to update the upload progress bar
          this.xhr.upload.addEventListener('progress', e => {
            this.loader.uploadTotal = 100;
            this.loader.uploaded = Math.round((e.loaded * 100) / e.total);
          });

          // Hookup a listener to listen for when the request state changes
          this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4 && this.xhr.status === 201) {
              // Successful upload, resolve the promise with the new image
              const response = JSON.parse(this.xhr.responseText);

              let images = {
                default: response.image_url,
              };

              resolve(images);
            } else if (this.xhr.status !== 201) {
              console.log(this.xhr.status)
              // Unsuccessful request, reject the promise
              reject('Upload failed');
            }
          };

          // Setup the form data to be sent in the request
          fd.append('image', file);
          this.xhr.send(fd);
        }),
    );
  }

  abort() {
    // This function is called to abort the request if an error occurs
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}


// This is function is used to create the upload adaptor for CKEditor
function MyUploadAdapterPlugin( editor ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
    return new CustomImageUploadAdapter('http://localhost:4000/upload', loader);
  };
}

ClassicEditor
  .create( document.querySelector( '#editor' ), {
    // This is where the plugin is added to the editor
    extraPlugins: [ MyUploadAdapterPlugin ],
  } )
  .catch( error => {
      console.error( error );
  } );
