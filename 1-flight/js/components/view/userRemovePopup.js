var userRemovePopup = flight.component(function() {

    this.defaultAttrs({
        selectedItem: 'active',
        userListSelector: document.querySelector('#user-list'),
        userItemsSelector: '#user-list li',
        userItemsRemoveSelector: '.remove'
    });

    this.userRemovePopup = function(event, data) {
        if(confirm('Вы действительно ходите удалить этого пользователя?')) {
            this.trigger('uiRemoveItemsRequested', {id: data.id});
        }
    };

    this.after('initialize', function() {
        this.on('uiUserRemovePopup', this.userRemovePopup);
    });
});
