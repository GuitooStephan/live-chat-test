class ValidationError extends Error {
    status = 400;

    constructor( message: string ) {
        super( message );

        this.name = this.constructor.name;
    }

    statusCode() {
        return this.status;
    }
}

export default ValidationError;
