declare global {
    namespace  NodeJS {
        interface ProcessEnv {
            token: string;
            guild: string;
            joinChannel: string;
            leaveChannel: string;
        }
    }
}

export {};