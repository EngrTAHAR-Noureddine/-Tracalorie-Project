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
        },
        addItem : function(name,calories){
            let ID;
            //create id
            if(data.items.length >0){
                ID =data.items[data.items.length -1].id+1;
            }else{
                ID=0;
            }
            calories = parseInt(calories);
            //create new item
            newItem = new Item(ID,name,calories);
            data.items.push(newItem);
            return newItem;
        }
    }
})(); 

//UI Controller 
const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list',
        addBtn : '.add-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput :'#item-calories'
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
        },
        getItemInput:function(){
            return {
                name : document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        } ,
        getSelectors : function(){
            return UISelectors;
        }
    } 

})();
// App Controller 
const App = (function(ItemCtrl,UICtrl){
    // Load event listeners 
    const loadEventListeners = function(){
        // Get UI Selectors 
        const UISelectors  = UICtrl.getSelectors();
        // Add item event 
        document.querySelector(UISelectors.addBtn).addEventListener(
            'click', itemAddSubmit );
    }
    //Add item submit 
    const itemAddSubmit = function(e){
        e.preventDefault();
        //console.log('ADD');
        //get form input from UI controller 
        const input = UICtrl.getItemInput();
        //check input 
        if(input.name !== ''&& input.calories !== ''){
            //Add Item 
            const newItem = ItemCtrl.addItem(input.name,input.calories);
        }
        //console.log(input);

    }

    //Public methods
    return {
        init: function(){
            console.log("Initializing App...");
           //fetch Items from data structure
            const items = ItemCtrl.getItems();
            // populate list with items
            UICtrl.populateItemList(items);
            //load event listeners 
            loadEventListeners();
        }
    }
   
})(ItemCtrl,UICtrl);

App.init();