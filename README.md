<!-- @format -->

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### steps to follow to deploy to kubernates

1. you have to create dockerfile

### content of dockerfile

FROM nginx:1.17
COPY build/ /usr/share/nginx/html

then you have to create .dockerignore file

### content of .dockerignore

node_modules/

2. Then we run this command to create a docker image:
   docker build -t my-react-app .

3. Connect to a Kubernetes cluster
   Open your Docker Desktop preferences and switch to your Kubernetes tab. Enable Kubernetes support here. It automatically creates a cluster for you.

Once it is running, connect to it with kubectl

kubectl config use-context docker-for-desktop

4. Upload the Docker image to your container registry
   To be able to pull the Docker image within the Kubernetes cluster, we need to upload the image to a Docker registry. We’re deploying the app into a local cluster, so we need a local registry.

You can create one with this command:

docker run -d -p 5000:5000 --restart=always --name registry registry:2

To upload our Docker image, we have to tag it with the hostname and port of our registry:

docker tag my-react-app localhost:5000/my-react-app
And then we push the image to our Docker registry:

docker push localhost:5000/my-react-app

5. Deploy the React application
   For deploying the React application to Kubernetes we need a deployment file. This makes sure our application will have as many replicas as we define. In addition, we can define the Docker image we want to use, what ports are used and further metadata for our application

### content of deployment file

kind: Deployment
apiVersion: apps/v1
metadata:
name: my-react-app
spec:
replicas: 2
selector:
matchLabels:
app: my-react-app
template:
metadata:
labels:
app: my-react-app
spec:
containers: - name: my-react-app
image: localhost:5000/my-react-app
imagePullPolicy: Always
ports: - containerPort: 80
restartPolicy: Always

With just the deployment we wouldn’t be able to access our application from outside. To expose applications, Kubernetes offers a service. Using a service we can define which ports to expose to the cluster/outside.
so need to create service.yaml file for that

### content of service.yaml

kind: Service
apiVersion: v1
metadata:
name: my-react-app
spec:
type: NodePort
ports: - port: 80
targetPort: 80
protocol: TCP
nodePort: 31000
selector:
app: my-react-app

Now You can now use this file to deploy your application to Kubernetes with:

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

You can then check if everything’s running using:

kubectl get pods kubectl get deployment kubectl get service

If everything went right, you should be able to go to http://localhost:31000 and see your react app, now served from a Kubernetes cluster
