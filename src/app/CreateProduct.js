import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import firebase from 'firebase';


class CreateProduct extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: '',
            uploadValue: 0,
            picture: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}${Date.now()}`);
        const taskPhoto = storageRef.put(file);

        taskPhoto.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message);
        }, () => {
            storageRef.getDownloadURL().then(url => {
                this.setState({
                    picture: url
                });
            })
        });
    }

    addTask(e) {
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    //M.toast({ html: 'Producto Actualizado' });
                    { alert('Producto Actualizado') }
                    this.setState({
                        title: '', description: '', _id: '', uploadValue: 0,
                        picture: ''
                    });
                    this.fetchTasks();
                });
        }
        else {
            if (this.state.title && this.state.description && this.state.picture) {
                console.log(this.state);
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        //M.toast({ html: 'Task Saved' });
                        { alert('Producto Guardado') }
                        this.setState({ title: '', description: '', uploadValue: 0, picture: '' });
                        this.fetchTasks();
                    })
                    .catch(err => console.error(err));
            }
            else{
                {alert('Favor de Rellenar todos los campos correctamente');}
            }
        }

        e.preventDefault();
    }

    componentDidMount() {
        //console.log('componente montado');
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    deleteTask(id) {
        if (confirm('¿Desea eliminar el producto?')) {
            //console.log('eliminando :', id);
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    //M.toast({ html: 'Task Deleted' });
                    { alert('Producto Eliminado') }
                    this.fetchTasks();
                });
        }
    }

    editTask(id) {
        {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id,
                    picture: data.picture
                })
            });
    }

    handleChange(e) {
        //console.log(e.target.value);
        var rgx = /^[0-9]*\.?[0-9]*$/;
        //return s.match(rgx);
        //console.log(e.target.value[0]);
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }

    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
         //if (/\+|-/.test(keyValue))
         if (!/^[0-9]*\.?[0-9]*$/.test(keyValue))
           event.preventDefault();
       }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card card-body">
                            <h4>Datos del Producto</h4>
                            <form onSubmit={this.addTask}>
                                <div className="form-group">
                                    <textarea name="title" onChange={this.handleChange}
                                        placeholder="Nombre del Producto" value={this.state.title}
                                        className="form-control" > </textarea>
                                </div>
                                <div className="form-group">
                                    <input name="description" onChange={this.handleChange}
                                        type="text" placeholder="Precio del Producto" className="form-control"
                                        onKeyPress={this.onKeyPress.bind(this)}
                                        value={this.state.description} />
                                </div>
                                <div className="form-group">
                                    <progress value={this.state.uploadValue} max="100"></progress>
                                    <input type="file" onChange={this.handleUpload} />
                                    <br />
                                    <img width="320" src={this.state.picture} alt="" />
                                </div>
                                <button type="submit" className="btn" style={{ backgroundColor: '#E10098', color: 'white' }}>
                                    Guardar
                                        </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td> <img width="160" src={task.picture} alt="" /></td>
                                                <td>{task.title}</td>
                                                <td>${task.description}</td>
                                                <td>
                                                    <button className=""
                                                        onClick={() => this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className=""
                                                        onClick={() => this.editTask(task._id)} style={{ margin: '4px' }}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateProduct;