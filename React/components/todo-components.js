import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import { addTodo, setVisibilityFilter, toggleTodo } from '../actions/todo-actions';

const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};
Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapStateToPropsFilterLink = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter,
    };
};
const mapDispatchToPropsFilterLink = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter));
        },
    };
};
const FilterLink = connect(mapStateToPropsFilterLink, mapDispatchToPropsFilterLink)(Link);

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter="SHOW_ALL">
            All
            </FilterLink>
        {", "}
        <FilterLink filter="SHOW_ACTIVE">
            Active
        </FilterLink>
        {", "}
        <FilterLink filter="SHOW_COMPLETED">
            Completed
        </FilterLink>
    </p>
);

const AddTodo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return;
                    }
                    dispatch(addTodo(input.value));
                    input.value = '';
                }}
            >
                <input ref={node => { input = node; }} />
                <button type="submit">
                    Add Todo
        </button>
            </form>
        </div>
    );
};
AddTodo.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none',
        }}
    >
        {text}
    </li>
);
Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);
TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired,
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};

const mapStateToPropsVisibileTodos = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
    };
};
const mapDispatchToPropsVisibileTodos = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id));
        },
    };
};
const VisibleTodoList = connect(mapStateToPropsVisibileTodos, mapDispatchToPropsVisibileTodos)(TodoList);

const AddTodoContainer = connect()(AddTodo);

const App = () => (
    <div>
        <AddTodoContainer />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;