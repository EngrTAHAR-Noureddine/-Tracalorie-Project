//Storage Controller 

//Item Controller 
const ItemCtrl = (function(){
    //Item Constrctor
    const Item = function(id,name,calories){
        this.id =id;
        this.name = name;
        this.calories = calories;
    }
    //Data structor /State
    const data = {
        items : [
            {id:0,name:'Steak Dinner',calories : 1200},
            {id:1,name:'Cookies',calories : 3200},
            {id:2,name:'Eggs',calories : 400},
            
        ],
        currentItem: null,
        totalCalories:0
    };
    return {
        getItems : function(){
            return data.items;
        },
        logData : function(){
            return data;
        }
    }
})(); 

//UI Controller 
const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list'
    };
    //Public methods
    return {
        populateItemList : function(items){
        let html = ``;
        items.forEach(function(item){
            html += ` <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`; 
        }
        );
        document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    } 

})();
// App Controller 
const App = (function(ItemCtrl,UICtrl){
    //Public methods
    return {
        init: function(){
            console.log("Initializing App...");
           //fetch Items from data structure
            const items = ItemCtrl.getItems();
            // populate list with items
            UICtrl.populateItemList(items);
        }
    }
   
})(ItemCtrl,UICtrl);

App.init();