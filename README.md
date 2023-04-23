# GCP PubSub Emulator UI

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

To run the emulator, you can run `make env` to start the emulator and the UI. The emulator will run on port 8086 and the UI will run on port 8083.

## Configuration

By default, the GCP PubSub Emulator UI connects to the Pub/Sub emulator running on `localhost:8085`. If you want to use a different host or port, you can change the configuration by editing the `.env` file.

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
