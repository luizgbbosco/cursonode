let errors = [];

function validantionContract(){
    errors = [];
}

validantionContract.prototype.isRequired = (value, message) => {
    if (!value || value.lenght <= 0)
        errors.push({message:message});
}

validantionContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.lenght < min )
        errors.push({message:message});
}

validantionContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.lenght > max)
        errors.push({message : message});
}

validantionContract.prototype.isFixedLen = (value, len, message) => {
    if (value.lenght != len)
        errors.push({message:message});
}

validantionContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w)*$/);
    if ( !reg.test(value))
        errors.push({message:message});
}

validantionContract.prototype.errors = () => {
    return errors;
}

validantionContract.prototype.clear = () => {
    errors = [];
}

validantionContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = validantionContract;