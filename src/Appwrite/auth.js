import config from '../config/config'
import {Client, Account, ID} from 'appwrite'

// creating the service for more best practices,
// so that is why we creating AuthService class 
export class AuthService {
   client = new Client();
   account;
   

    // we are making this constructor because when we create
    // the object of the class then automatically the constructor will be
    // called
   constructor(){
    this.client= new Client();
    console.log("Project ID:", config.projectId);

    this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
        this.account = new Account(this.client)       
   }

   async createAccount({name, email, password}){  // destructuring the parameter(which will be generally object)
    try{
        const userAccount = await this.account.create(ID.unique(),email, password, name);
        if(userAccount){
            // used to call another function
            return this.login({email, password});
        }
        else{
            return userAccount;
        }
    }catch(error){
        throw error;

    }
   }

   async login({email, password}){
    try{
        return await this.account.createEmailPasswordSession(email , password);
    }
    catch(error){
        throw error;
    }
   }

   async getCurrentUser(){
    try{
       
         return await this.account.get(); // Now it's safe to call      
    }
    catch(error){
       console.log("Appwrite Service :: getCurrentUser :: error", error)
    }
    return null;
   }

   async logout(){
    try{
        return await this.account.deleteSessions();
    }
    catch(error){
        console.log("Appwrite service :: logout :: error", error);
    }
   }
} 


const authService = new AuthService();

export default authService;