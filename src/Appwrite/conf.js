import config from "../config/config";
import {Client, ID, Databases, Query , Storage} from "appwrite";

export class Service{
client = new Client();
databases;
bucket; // storage

constructor(){

    this.client = new Client();
    this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    
}

async createPost({title, slug, featuredImage, status, userId}){
    try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                featuredImage,
                status, 
                userId,
                content
            }
        )
        
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error)
    }
}

async updatePost(slug, {status,title, featuredImage, content}){
    try {
        return await this.databases.updateDocument(
            config.appwritedatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
        
    } catch (error) {
        console.log("appwritee service :: uppdatePost :: error", error);
    }
}

async deletePost(slug){
    try {
       await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
       ) 
       return true
    } catch (error) {
        console.log("appwrite service :: deletePost :: error", error);
        return false
    }
}
async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
            return false
    }
}

async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("appwrite service :: getPosts :: error", error);
        return false;
    }
}

// File Upload Service

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite service :: uploadFile ::  error", error);
        return false
    }
}

async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("appwrite service :: deleteFile :: error", error);
        return false;
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
}
}

const service = new Service();
export default service;