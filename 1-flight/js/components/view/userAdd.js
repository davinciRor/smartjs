var userAdd = flight.component(function() {

    this.defaultAttrs({
        element: document.querySelector('.main-content')
    });

    this.showAddUserForm = function(event, data) {
        var that = this;
        var element = this.attr.element;
        var inputName;
        var inputPhone;
        var inputRole;
        element.innerHTML = document.querySelector('#addTemplate').innerHTML;
        inputName = element.querySelector('#icon_prefix');
        inputPhone = element.querySelector('#icon_telephone');
        inputRole = element.querySelector('select');
        $('select', element).material_select();

        element.querySelector('.save-btn').addEventListener('click', function () {
            var data = {
                name: inputName.value,
                phone: inputPhone.value,
                role: inputRole.value
            };
            that.trigger('uiCreateUser', data);
        });
    };

    this.after('initialize', function() {
        this.on(document, 'uiAddUser', this.showAddUserForm);
    });
});
