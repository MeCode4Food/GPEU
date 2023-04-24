# GCP PubSub Emulator UI
![image](https://user-images.githubusercontent.com/25502412/234051566-63ba1bc3-2ba5-4512-bdca-895a0c5b7bce.png)
![image](https://user-images.githubusercontent.com/25502412/234051485-237f2c49-d502-47ab-925c-19d11e45cc91.png)

This is an open source user interface (UI) for the Google Cloud Pub/Sub emulator. The UI allows you to interact with the emulator and simulate Pub/Sub messaging without using the Google Cloud Platform (GCP) console or command-line tools.

This UI is made with Vite, React, and Tailwind CSS. It is based on the Google Cloud Pub/Sub emulator and the React framework.
Additionally, the API used to interact with the emulator is based on the Google Cloud Pub/Sub REST API.

## Getting started

To use the GCP PubSub Emulator UI, follow these steps:

- Clone the repository or download the source code.
- Install the dependencies by running `yarn`.
- Build the UI by running `yarn build`.
- Start the UI by running `yarn start`.
- Open your web browser and go to http://localhost:3000.

You should see the main page of the UI, which lets you create, delete, list, and publish messages to Pub/Sub topics and subscriptions.

### Run emulator

To run the emulator, you can run `make env` to start the emulator and the UI. The emulator will run on port 8086 and the UI (for the firebase tools) will run on port 8083.

## Build & Run app as an image
Run `make image` to build the image and `make runimage` to run the image locally. The app will be available on port 8080.

## Contributing

We welcome contributions to the GCP PubSub Emulator UI. If you want to fix a bug, add a feature, or improve the documentation, please follow these steps:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes and commit them.
- Push your changes to your fork.
- Create a pull request to the main branch of the original repository.

## License

The GCP PubSub Emulator UI is released under the MIT License. See the `LICENSE` file for more details.

## Acknowledgments

This project is based on the Google Cloud Pub/Sub emulator and the React framework. We thank the developers of these projects for their contributions to open source software.
