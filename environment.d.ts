declare global {
    namespace  NodeJS {
        interface ProcessEnv {
            token: string;
            guild: string;
            joinChannel?: string;
            leaveChannel?: string;
            antispam: 'true' | string;
            antispamMaxCount?: string;
            antispamTime?: string;
            feedbackChannel?: string;
        }
    }
}

export {};