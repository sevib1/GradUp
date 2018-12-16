export const HEIGHT = {
    system: 'http://loinc.org',
    code: "8302-2",
    get toString() {
        return this.system + '|' + this.code;
    }
}

export const STEPS = {
    system: 'http://loinc.org',
    code: "41950-7",
    get toString() {
        return this.system + '|' + this.code;
    }
}

export const MEDIA = {
    system: "http://loinc.org",
    code: "72170-4",
    get toString() {
        return this.system + '|' + this.code;
    }
}

export const HEARTRATE = {
    system: "http://loinc.org",
    code: "8867-4",
    get toString() {
        return this.system + '|' + this.code;
    }
}

export const BODYWEIGHT = {
    system: "http://loinc.org",
    code: "29463-7",
    get toString() {
        return this.system + '|' + this.code;
    }
}