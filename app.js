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
            // {id:0,name:'Steak Dinner',calories : 1200},
            // {id:1,name:'Cookies',calories : 3200},
            // {id:2,name:'Eggs',calories : 400},
            
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
        setCurrentItem: function(item){
            data.currentItem = item;
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
        },
        getCurrentItem: function(){
            return data.currentItem;
          },
        getTotalCalories : function(){
            let total = 0;
            data.items.forEach(function(item){
                total += item.calories;
            });
            //set total cal in data structure
            data.totalCalories = total;
            return data.totalCalories;
        },
        getItemById: function(id){
            let found = null;
            // Loop through items
            data.items.forEach(function(item){
              if(item.id === id){
                found = item;
              }
            });
            return found;
          },
    }
})(); 

//UI Controller 
const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list',
        addBtn : '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput:'#item-name',
        itemCaloriesInput :'#item-calories',
        totalCalories : '.total-calories'
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
        },
        hideList : function(){
            document.querySelector(UISelectors.itemList).style.display = 'none'; 
        },
        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addListItem : function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block'; 
            //create li element 
            const li = document.createElement('li');
            //add class 
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        getSelectors : function(){
            return UISelectors;
        },
        showTotalCalories : function(total){
            document.querySelector(UISelectors.totalCalories).textContent = total;
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
          },
          clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
          },
          showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
          },
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
       // Edit icon click event
       document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
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
            //Add to UI 
            UICtrl.addListItem(newItem);

            //get total calories 
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total cal in UI
            UICtrl.showTotalCalories(totalCalories);

            UICtrl.clearInput();
        }
        //console.log(input);

    }
      // Update item submit
  const itemUpdateSubmit = function(e){
    if(e.target.classList.contains('edit-item')){
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

    //Public methods
    return {
        init: function(){
           // Clear edit state / set initial set
             UICtrl.clearEditState();
            console.log("Initializing App...");
           //fetch Items from data structure
            const items = ItemCtrl.getItems();
            if(items.length==0){
                UICtrl.hideList();
            }else{
                // populate list with items
                UICtrl.populateItemList(items);
            }

           //get total calories 
           const totalCalories = ItemCtrl.getTotalCalories();
           // add total cal in UI
           UICtrl.showTotalCalories(totalCalories);
            //load event listeners 
            loadEventListeners();
        }
    }
   
})(ItemCtrl,UICtrl);

App.init();