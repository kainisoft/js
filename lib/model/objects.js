Objects = new Mongo.Collection('objects');

//Astro.createValidator({
//    name: 'locationValidator',
//    validate: function( fieldValue, fieldName, maxLength ) {
//        if ( !fieldValue || !fieldValue.latitude || !fieldValue.longitude ) {
//            return false;
//        }
//
//        return +fieldValue.latitude > 0 && +fieldValue.longitude > 0;
//    }
//});

var stringRequiredValidator = Validators.and([
    Validators.required(),
    Validators.string()
]);

var numberRequiredValidator = Validators.and([
    Validators.required(),
    Validators.number(),
    Validators.gte(1)
]);

MapObject = Astro.Class({
    name: 'MapObject',
    collection: Objects,
    fields: {
        type: 'string',
        name: 'string',
        description: 'string',
        latitude: 'number',
        longitude: 'number',
        dangerLevel: 'number'
    },
    validators: {
        type: Validators.and([
                stringRequiredValidator,
                Validators.choice(['Учреждение', 'Транспорт', 'Природа', 'Территория', 'Инфраструктура', 'Человек', 'Неопределённый'])
            ]),
        name: stringRequiredValidator,
        latitude: numberRequiredValidator,
        longitude: numberRequiredValidator,
        dangerLevel: numberRequiredValidator
    },
    methods: {
        getValidObjectTypes(){
            return ['Учреждение', 'Транспорт', 'Природа', 'Территория', 'Инфраструктура', 'Человек', 'Неопределённый'];
        }
    },
    events: {
        validationError: function( error ) {
            switch (error.data.fieldName) {
                case 'type':
                    error.setMessage('Укажите тип');
                    break;
                case 'name':
                    error.setMessage('Укажите название');
                    break;
                case 'latitude':
                case 'longitude':
                    error.setMessage('Укажите местоположение');
                    break;
                case 'dangerLevel':
                    error.setMessage('Укажите уровень опасности');
                    break;
            }

            error.stopPropagation();
        }
    }
});
