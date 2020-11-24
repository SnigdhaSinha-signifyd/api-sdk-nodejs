import Decryptor from "./decryptor";

export default class NoOpDecryptor implements Decryptor {
    public decrypt(subject: string, _: string): string {
        return subject;
    }
}
