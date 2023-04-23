
class PubSub {
  projectId: string;
  apiEndpoint: string;
  constructor(options: {
    projectId: string;
  }) {
    this.projectId = options.projectId;
    this.apiEndpoint = import.meta.env.VITE_PUBSUB_EMULATOR_HOST;

    if (this.apiEndpoint.startsWith("localhost")) {
      this.apiEndpoint = `http://${this.apiEndpoint}`;
    }
  }

  baseUrl = () => {
    return `${this.apiEndpoint}/v1/projects/${this.projectId}`;
  }
}


export const newClient = (projectId: string): PubSub => {
  return new PubSub({
    projectId,
  });
}

export default PubSub;
