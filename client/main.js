import { Template } from 'meteor/templating';
import './main.html';
import {Todos} from '../lib/collections.js';
import {Accounts} from 'meteor/accounts-base';


Accounts.ui.config({
  passwordSignupFields : 'USERNAME_ONLY'
});

Template.main.onCreated(function mainOnCreated(){
  Meteor.subscribe('todos');
})

Template.main.helpers({
  title(){
    return 'TodoApp';
  },
  todos(){
    const todos = Todos.find();
    return todos;
  }
})


Template.main.events({
  'submit .add-todo'(event){
    event.preventDefault();

    const text = event.target.text.value;
    const time = event.target.time.value;
    
    Meteor.call('todos.insert',text,time);

    event.target.text.value = '';
    event.target.time.value = '';
  }
})

Template.todo.events({
  'click .toggle-checked'(event){
    Meteor.call('todos.setChecked', this.id, !this.setChecked);
  },
  'click .delete'(event){
    Meteor.call('todos.remove', this._id);
  },
  'click .toggle-private'(){
    Meteor.call('todos.setPrivate', this._id, !this.private)
  }
})


Template.todo.helpers({
  isOwner(){
    return this.owner === Meteor.userId()
  }
})