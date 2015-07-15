var userEdit = flight.component(function() {

    this.defaultAttrs({
        element: document.querySelector('.main-content')
    });

    this.showEditUserForm = function(event, data) {
        var user = data.user;
        var that = this;
        var element = this.attr.element;
        var inputName;
        var inputPhone;
        var strikesZone;
        var cityZone;
        element.innerHTML = document.querySelector('#editTemplate').innerHTML;
        inputName = element.querySelector('#icon_prefix');
        inputPhone = element.querySelector('#icon_telephone');
        strikesZone = element.querySelector('.strikes-field');
        cityZone = element.querySelector('.city-field');
        inputName.value = user.name;
        inputPhone.value = user.phone;

        if (user instanceof Student) {
            strikesZone.querySelector('input').value = user.getStrikesCount();
        } else {
            strikesZone.style.display = 'none';
        }

        if (user instanceof Support) {
            cityZone.querySelector('select').value = user.location;
            $('select', element).material_select();
        } else {
            cityZone.style.display = 'none';
        }

        element.querySelector('.save-btn').addEventListener('click', function () {
            var data = {
                id: user.id,
                name: inputName.value,
                phone: inputPhone.value,
                strikes: strikesZone.querySelector('input').value,
                location: cityZone.querySelector('select').value
            };
            that.trigger('uiUserUpdate', data);
        });
    };



    this.after('initialize', function() {
        this.on(document, 'uiUserEdit', this.showEditUserForm);
    });
});
