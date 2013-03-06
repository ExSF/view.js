/* view.js */
/* Developers : Paulo Tavares */
/* This is a project is free and open source only! */

/* ----------------------------------------------------------- */

//This is the main object that defines the viewmodel
var DynamicModelResult = function() {}
var ViewModel = function ViewModel(modelname, keys) {
    this.modelName = modelname;
    this.keys = new Array();
    this.keys = keys;
    this.properties = new Array();
    this.instance = null;
    this.model = DynamicModelResult.prototype;
    function initialize() {
        modelForm = document.forms.namedItem(modelName);
        if (modelForm == null) {
            modelForm = document.getElementById(modelName);
            if (modelForm != null)
                createProperties();
            
        }
        else {
            createProperties();
        }

    }
    function createProperties()
    {
        for(i=0; i < keys.length; i++)
        {
            var prop = new ViewProperty(keys[i], document.querySelector("#"+modelName+"#"+keys[i]));
            properties.push(prop); 
            
        }
    }

    ViewModel.prototype.getModelName = function () { return modelName; }
    ViewModel.prototype.AddProperty = function (viewProp) {
        for (i = 0; i < properties.length; i++) {
            if (properties[i].getName() == viewProp.getName()) {
                return false;
            }
        }
        properties.push(properties);
        return true;
    }
    ViewModel.prototype.GetValue = function(propertyName) { }



    function checktype(obj, type) {
        if (type == null) return typeof (obj)
        else return typeof (obj) == type;
    }


}

//Defines the model for a property
var ViewProperty = function (name, control, value) {
    /* Private members */
    this.pname = name;
    this.pvalue = null
    //    var ptype = type;
    if (value != null)
        this.pvalue = value;
    else
        this.pvalue = control.value;

    this.pcontrol = control;
    pcontrol.value = pvalue;
    this.descriptor = {
        configurable: false,
        writable: true,
        enumerable: true,
        value: control.value,
        get: function () { return control.value; },
        set: function (value) { control.value = value; }

    }

    /*public members */
    ViewProperty.prototype.getName = function () { return pname; }
    ViewProperty.prototype.setName = function (name) { pname = name; }
    //  ViewProperty.prototype.getType = function () { return ptype; }
    //  ViewProperty.prototype.setType = function (type) { ptype = type; }
    ViewProperty.prototype.getValue = function () { return pvalue }
    ViewProperty.prototype.setValue = function (value) { pvalue = value; }
    ViewProperty.prototype.getControl = function () { return pcontrol; }
    ViewProperty.prototype.setControl = function (control) { pcontrol = control; }
    ViewProperty.prototype.getDescriptor = function () { return descriptor; }


    /*static members */
    ViewProperty.acceptableTypes = new Array("string", "short", "int", "long", "char", "double", "Date", "Time");


}

var ViewValidationRule = function(name,value,validator, comparingvalues)
{
    this.vname = name;
    this.value = value;
    this.comparingValues = comparingvalues;
    this.validator = validator == null ? function(values) { return value != null;   } : validator;
    ViewValidationRule.prototype.validate = function () { return validator(); }
    ViewValidationRule.prototype.getRuleName = function() {return vname; }
    ViewValidationRule.prototype.setRuleName = function(value) { vname = value; }
    ViewValidationRule.prototype.getComparingValues = function() { }
    ViewValidationRule.prototype.setComparingValues = function(values) { comparingValues = values; }
}
