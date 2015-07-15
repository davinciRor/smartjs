var userListData = flight.component(function() {

    this.defaultAttrs({
        items: []
    });

    this.serveUserItems = function(event, data) {
        var that = this;
        User.load(function (err, list) {
            if (err) {
                alert('Ошибка загрузки списка пользователей');
                return;
            }
            list.forEach(function (record) {
                if(record) {
                    that.attr.items.push(record);
                }
                that.trigger('dataUserItemsServed', {markup: record});
            });
        });
    };

    this.removeById = function(event, data) {
        var that = this;
        var user = this.getById(data.id);

        user.remove(function (err) {
            if (err) {
                alert('Ошибка удаления пользователя');
                return;
            }
            that.attr.items.splice(that.attr.items.indexOf(user), 1);
            that.trigger('dataRemoveItemsRequested', {user: user});
        });
    };

    this.selectById = function(event, data) {
        var user = this.getById(data.id);
        this.trigger('dataUserById', {user: user});
    };

    this.getById = function(data) {
        for (var i = 0; i < this.attr.items.length; i++) {
            if (this.attr.items[i].id == data) {
                return this.attr.items[i];
            }
        }
    };

    this.updateUser = function(event, data) {
        var that = this;
        var user = this.getById(data.id);

        Object.keys(data).forEach(function (key) {
            user[key] = data[key];
        });

        user.save(function (err) {
            if (err) {
                alert('Ошибка обновления пользователя');
            }
            that.trigger('dataUpdateItem', {user: user});
        });
    };

    this.createUser = function(event, data) {
        var that = this;
        var user = new window[data.role](data);
        user.save(function (err) {
            if (err) {
                alert('Ошибка обновления пользователя');
            }
            if (!user.id) {
                alert('После сохранения не появился id! это ошибка!');
            }
            that.attr.items.push(user);
            that.trigger('dataCreateUser', {user: user});
        });
    };

    this.after('initialize', function() {
        this.on('uiUserItemsRequested', this.serveUserItems);
        this.on('uiRemoveItemsRequested', this.removeById);
        this.on('uiSelectById', this.selectById);
        this.on('uiUserUpdate', this.updateUser);
        this.on('uiCreateUser', this.createUser);
    });
});


