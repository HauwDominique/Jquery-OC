const TodoList = (function($) {

    return class Todo {

        constructor() {
            $(document).ready(() => this.init());
        }

        init() {
            this.$todoList = $('#todoList');
            this.createTodoList();
            this.initObserver();
        }

        initObserver() {
            $('#form').submit(this.onSubmitTodo.bind(this))
        }

        createTodoList() {
            $.ajax({
                url: 'http://192.168.39.99:3000/api/todos',
                success: this.onSuccessGetTodos.bind(this),
                error: this.onErrorGetTodos
            });
        }

        onSubmitTodo(event) {
            event.preventDefault();
            let newTodo = $('#newTodo')
            let valNewTodo = newTodo.val();
            const todo = {content: valNewTodo};
            this.saveTodo(todo);
            $(newTodo).val('');
        }

        saveTodo(todo) {
            $.ajax({
                type: "POST",
                url: 'http://192.168.39.99:3000/api/todos',
                data: todo,
                success: this.onSuccessCreateTodo
            });
        }

        $('#listTodos').on('click', '.delete', deleteTodo);

        // $('button').click(deleteUser);

        deleteTodo(event) {
            var index = $(event.currentTarget).data('index');
            $(`#${index}`).remove();
        };



        // onClickOnMyButtonRemove(event) {
        //     $(this).data()
        //     $(this).parent().remove();
        // }

        // deleteTodo() {
        //     $(this).data();
        //     console.log(data);
        // }


        onSuccessCreateTodo(data) {
            console.log(data);
        }

        onSuccessGetTodos(data) {
            // console.log(data.result);
            this.renderTodos(data.result);
        }

        onErrorGetTodos(error) {
            console.log(error);
        }

        renderTodos(todos) {
            const todosHtml = todos.map(todo => this.getHtmlTodo(todo));
            // console.log(todosHtml);
            this.$todoList.append(todosHtml);
        }

        getHtmlTodo(todo) {
            return `<li id="${todo.id}">${todo.content}<span class="delete" data-index="${todo.id}">Delete</span></li>`;
        }




        // function deleteUser(event) {
        //     var index = $(event.currentTarget).data('index');
        //     $(`#user-${index}`).remove();
        // };


    }
})(jQuery);


new TodoList();
// var localArray = TodoList.result;

// console.log(localArray);

// localArr.forEach(function (value, index) {
//     result += (`<li id="user-${index}">${value}<button data-index="${index}">Delete</button></li>`);
//     // console.log(result);
// });
