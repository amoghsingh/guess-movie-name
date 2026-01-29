const users=[];

class User{
    constructor({id, email, password}){
        this.id =id;
        this.email=email;
        this.password=password;
        this.refreshToken=null;
    }

    static findByEmail(email){
        return users.find(user => user.email === email);
    }

    static findByRefreshToken(token){
        return users.find(user => user.refreshToken === token);
    }

    static create(user){
        users.push(user);
        return user;
    }

    static update(user){
        const index = users.findIndex(x=>x.id === user.id);
        users[index]=user;
        return user;
    }
}

module.exports = User;