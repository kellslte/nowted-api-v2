export default function startServerPinger(serverUrl) {
  function pingServer() {
    fetch(serverUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Server pinged successfully at ' + new Date().toLocaleTimeString());
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  // Ping the server immediately
  pingServer();

  // Ping the server every 15 minutes (15 minutes * 60 seconds * 1000 milliseconds)
  const interval = 15 * 60 * 1000;
  setInterval(pingServer, interval);
}