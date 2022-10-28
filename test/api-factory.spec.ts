import assert from "assert";
import { SmartlingApiFactory } from "../api/factory";
import { SmartlingJobsApi } from "../api/jobs";
// eslint-disable-next-line import/no-unresolved, @typescript-eslint/no-var-requires

it("should have request headers overriden to factory values", () => {
    const clientLibId = 'testClient';
    const clientLibVersion = '0.0.1';
    const apiFactory = new SmartlingApiFactory('test', 'test', 'test', null, clientLibId, clientLibVersion);
    const client = apiFactory.createApiClient(SmartlingJobsApi);
    const headers = client.getDefaultHeaders();
    assert.deepEqual(headers, {
        Authorization: "test_token_type test_access_token",
        "Content-Type": "application/json",
        "User-Agent": clientLibId + '/' + clientLibVersion,
    });
});
