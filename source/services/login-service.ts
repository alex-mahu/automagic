import { APIRequestContext, APIResponse } from '@playwright/test';


export class LoginService {
    private readonly requestService: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.requestService = request;
    }

    async login(email?: string, password?: string): Promise<APIResponse> {
        const response = await this.requestService.post('/api/authenticate/primary/password/prove/', {
            data: { email, password }
        });

        return response;
    }
}