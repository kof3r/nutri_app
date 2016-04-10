/**
 * Created by ggrab on 23.2.2016..
 */

//TODO: Sortiranje i indikatori
//TODO: Kada komponenta dobije fokus neka okine SelectedItemsChangedEvent
//TODO: Cacheiraj stilove

module.exports = {
        templateUrl:'templates/table-view.html',
        bindings:{
            title:'@',
            tableView:'@',

            items:'<',
            itemSelectedEvent:'@onItemSelectedEmit',
            itemDeselectedEvent:'@onItemDeselectedEmit',
            selectedItemsChangedEvent:'@onSelectedItemsChangedEmit',
            selectItemEvent:'@selectItemOn',

            resetEvent:'@resetOn',
            enableEvent:'@enableOn',
            disableEvent:'@disableOn',
            focusEvents:'@focusOn',

            newClick:'&onNewClick',
            editClick:'&onEditClick',
            deleteClick:'&onDeleteClick',
            syncClick:'&onSyncClick',
            onRowDblClick:'&',
            onDelKeyUp:'&'
        },
        controller: require('./table-view-controller')
}