openerp.front_test1 = function(instance) {
    var QWeb = instance.web.qweb;

    instance.web.client_actions.add('tag.action.page_front_test1', 'instance.front_test1.action_bd_front_view');
    instance.front_test1.action_bd_front_view = instance.web.Widget.extend({
        template: 'page_front_test1',

        init: function(parent, context) {
            var self = this;
            this._super(parent);
            this._super.apply(this, arguments);
        },
        destroy: function() {
            return this._super();
        },
    });
};