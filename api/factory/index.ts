import { SmartlingAuthApi } from "../auth";
import { SmartlingBaseApi } from "../base";
import { Logger } from "./logger";

export class SmartlingApiFactory {
    private readonly authApiClient: SmartlingAuthApi;

    constructor(
        userId: string,
        userSecret: string,
        private readonly baseUrl: string,
        private readonly logger: Logger = {
            debug: () => {},
            warn: () => {},
            error: () => {}
        },
        private readonly clientLibId: string = '',
        private readonly clientLibVersion: string = '',
    ) {
        this.authApiClient = new SmartlingAuthApi(
            baseUrl,
            userId,
            userSecret,
            logger,
        );
        this.baseUrl = baseUrl;
        this.logger = logger;
    }

    public createApiClient<T extends SmartlingBaseApi>(constructor: new (baseUrl: string, authApi: SmartlingAuthApi, logger) => T, options: object = {}): T {
        const instance = new constructor(this.baseUrl, this.authApiClient, this.logger);

        instance.setOptions(
            Object.assign(
                options,
                {
                    headers: {
                        "User-Agent": this.clientLibId === '' ? instance.getClientLibId() : this.clientLibId + '/' + this.clientLibVersion === '' ? instance.getClientLibVersion() : this.clientLibVersion,
                        "X-SL-ServiceOrigin": this.clientLibId === '' ? instance.getClientLibId() : this.clientLibId,
                    }
                }
            )
        );

        return instance;
    }
}
