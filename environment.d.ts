declare global {
    namespace  NodeJS {
        interface ProcessEnv {
            token: string;
            guild: string;
            joinChannel?: string;
            joinImage: 'true' | string;
            leaveChannel?: string;
            antispam: 'true' | string;
            antispamMaxCount?: string;
            antispamTime?: string;
            feedbackChannel?: string;
            locale?: string;
        }
    }
}

export {};