export class Processor {
    id: number;
    power: number;
    private _isBusy: boolean;

    constructor(id: number, power: number) {
        this.id = id;
        this.power = power;
        this._isBusy = false;
    }

    get isBusy(): boolean {
        return this._isBusy;
    }

    assignTask(): void {
        if (this._isBusy) {
            throw new Error("Processor is already busy.");
        }
        this._isBusy = true;
    }

    completeTask(): void {
        if (!this._isBusy) {
            throw new Error("Processor is not busy.");
        }
        this._isBusy = false;
    }
}
