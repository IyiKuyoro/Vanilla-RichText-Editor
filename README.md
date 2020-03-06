# Vanilla RichText Editor

This is a simple CMS that uses CKEditor and a cloudinary image upload adapter

## How it works

- I used instructions found [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/quick-start.html) to create the editor.
- I added a 'EditorSetup' script which contains the class for the CKEditor-Cloudinary-Image-Upload-Adapter.
- I then used instructions found [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/configuration.html#adding-features) to setup the adaptor with CKEditor.
- You will need an unsigned upload preset for this to work properly. Find instructions for setting that up [here](https://support.cloudinary.com/hc/en-us/articles/360004967272-Upload-Preset-Configuration)
