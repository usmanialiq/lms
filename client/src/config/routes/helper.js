export default function ClientRoute(route) {
    return process.env.NODE_ENV === "production" 
        ? ("/" + route) : ("/" + route);
}