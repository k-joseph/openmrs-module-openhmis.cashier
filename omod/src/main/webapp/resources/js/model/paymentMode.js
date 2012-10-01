define(
    [
        'lib/underscore',
        'lib/backbone',
        'model/generic',
        'model/fieldGenHandler'
    ],
    function(_, Backbone, openhmis) {
        openhmis.PaymentModeAttributeType = openhmis.GenericModel.extend({
            meta: {
                name: "Attribute Type",
                namePlural: "Attribute Types",
                openmrsType: 'metadata'
            },

            schema: {
                name: { type: 'Text' },
                format: {
                    type: 'Select',
                    options: new openhmis.FieldFormatCollection()
                },
                foreignKey: { type: 'BasicNumber' },
                regexp: { type: 'Text' },
                required: { type: 'Checkbox' }
            },
            toString: function() { return this.get('name'); }
        });

        openhmis.PaymentMode = openhmis.GenericModel.extend({
            meta: {
                name: "Payment Mode",
                namePlural: "Payment Modes",
                openmrsType: 'metadata',
                restUrl: 'paymentMode'
            },

            schema: {
                name: { type: 'Text' },
                description: { type: 'Text' },
                attributeTypes: { type: 'List', itemType: 'NestedModel', model: openhmis.PaymentModeAttributeType }
            },

            toJSON: function() {
                if (this.attributes.attributeTypes !== undefined) {
                    // Can't set these, so need to remove them from JSON
                    for (var attributeType in this.attributes.attributeTypes)
                        delete this.attributes.attributeTypes[attributeType].resourceVersion;
                }
                return openhmis.GenericModel.prototype.toJSON.call(this);
            }
        });

        return openhmis;
    }
);