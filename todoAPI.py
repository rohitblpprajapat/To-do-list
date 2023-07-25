from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort


app = Flask(__name__)
api = Api(app)


todos = {
    "todo1": {'task': 'build and Api by today only'}
    
}

def abort_if(todo_id):
    if todo_id not in todos:
        abort(404, message="Todo {} doesn't exists.".format(todo_id))
        
parser = reqparse.RequestParser()
parser.add_argument('task')

class Todo(Resource):
    def get(self, todo_id):
        abort_if(todo_id)
        return todos[todo_id]
    
    def put(self, todo_id):
        args= parser.parse_args()
        task = {"task" : args['task'] }
        todos[todo_id] = task
        return task, 201
    
    def delete(self, todo_id):
        abort_if
        del todos[todo_id]
        return '', 204
    
class TodoList(Resource):
    def get(self):
        return todos
    def post(self):
        args = parser.parse_args()
        todo_id = int(max(todos.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        todos[todo_id] = {'task': args['task']}
        return todos[todo_id], 201
    
    
api.add_resource(TodoList, '/')
api.add_resource(Todo, '/todos/<todo_id>')

if __name__=="__main__":
    app.run(debug=True)