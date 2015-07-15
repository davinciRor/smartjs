var userList = flight.component(function() {

    this.defaultAttrs({
        selectedItem: 'active',
        userListSelector: '#user-list',
        userItemsSelector: '#user-list li',
        userItemsRemoveSelector: '.remove',
        addUserSelector: '.add-user'
    });

    this.renderUserItems = function(event, data) {
        var item = data.markup;
        var list = document.querySelector(this.attr.userListSelector);

        if (!item) return;
        var container = document.createElement('li');
        container.setAttribute('data-id', item.id);
        container.className = 'waves-effect waves-orange';
        container.appendChild(this.generateTemplate(item));
        container.style.opacity = 0;
        if (item instanceof Student && item.strikes === 1) {
            container.classList.add('lime');
        }
        if (item instanceof Student && item.strikes > 1) {
            container.classList.add('blue-grey');
        }
        list.appendChild(container);
        this.animate(container);
    };

    this.removeUser = function(event, data) {
        var item = data.user;
        var list = document.querySelector(this.attr.userListSelector);
        var container = list.querySelector('[data-id="' + item.id + '"]');
        if (!container) {
            return;
        }
        $(container).velocity({opacity: "0", translateX: "-100px"}, {
            duration: 800,
            easing: [60, 10],
            complete: function () { container.parentNode.removeChild(container); }
        });
    };

    this.selectUserItem = function(event, data) {
        var container = event.target;
        while (container.tagName !== 'LI') {
            container = container.parentNode;
        }
        if (event.target.classList.contains('remove')) {
            this.trigger('uiUserRemovePopup', {id: container.getAttribute('data-id')});
            event.stopPropagation();
            return;
        }
        this.trigger('uiSelectById', {id: container.getAttribute('data-id')});
    };

    this.selectedUserItem = function(event, data) {
        var user = data.user;
        var list = document.querySelector(this.attr.userListSelector);

        var currentActive = list.querySelector('.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        var container = list.querySelector('[data-id="' + user.id + '"]');
        container.classList.add('active');

        this.trigger('uiUserEdit', {user: user});
    };

    this.updateItem = function(event, data) {
        var item = data.user;
        var list = document.querySelector(this.attr.userListSelector);

        var container = list.querySelector('[data-id="' + item.id + '"]');
        container.innerHTML = '';
        container.appendChild(this.generateTemplate(item));
        container.classList.remove('lime');
        container.classList.remove('blue-grey');
        if (item instanceof Student && item.strikes === 1) {
            container.classList.add('lime');
        }
        if (item instanceof Student && item.strikes > 1) {
            container.classList.add('blue-grey');
        }

        this.animate(container);
    };

    this.addItem = function(event, data) {
        var item = data.user;
        var container = document.createElement('li');
        container.setAttribute('data-id', item.id);
        container.className = 'waves-effect waves-orange';
        container.appendChild(this.generateTemplate(item));
        container.style.opacity = 0;
        if (item instanceof Student && item.strikes === 1) {
            container.classList.add('lime');
        }
        if (item instanceof Student && item.strikes > 1) {
            container.classList.add('blue-grey');
        }
        document.querySelector(this.attr.userListSelector).appendChild(container);
        this.animate(container);
        this.trigger('dataUserById', {user: item});
    };

    this.animate = function(element) {
        $(element).velocity({ translateX: "-100px" }, {duration: 0});
        $(element).velocity({opacity: "1", translateX: "0"}, {duration: 800, easing: [60, 10]});
    };

    this.generateTemplate = function(data) {
        // в реальности здесь бы вызвался шаблонизатор
        var fragment = document.createDocumentFragment();
        var header = document.createElement('h4');
        var phone = document.createElement('p');
        var deleteLink = document.createElement('a');
        deleteLink.className = 'secondary-content';
        deleteLink.innerHTML = '<i class="remove mdi-action-highlight-remove"></i>';
        header.textContent = data.name;
        phone.textContent = data.phone;
        fragment.appendChild(deleteLink);
        fragment.appendChild(header);
        fragment.appendChild(phone);
        return fragment;
    };

    this.after('initialize', function() {
        var that = this;
        this.on(document, 'dataUserItemsServed', this.renderUserItems);
        this.on(document, 'dataRemoveItemsRequested', this.removeUser);
        this.on(document, 'dataUserById', this.selectedUserItem);
        this.on(document, 'dataUpdateItem', this.updateItem);
        this.on(document, 'dataCreateUser', this.addItem);
        this.on('click', {userListSelector: this.selectUserItem});
        this.on('click', {addUserSelector: function() {
            that.trigger('uiAddUser');
        }});

        this.trigger('uiUserItemsRequested');
    });
});
