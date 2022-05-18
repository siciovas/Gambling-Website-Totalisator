using Microsoft.AspNetCore.SignalR;
using PSAIPI.Models;

namespace PSAIPI.Controllers
{
    public class MessageController : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserLiveChatConnection> _connections;

        public MessageController(IDictionary<string, UserLiveChatConnection> connections)
        {
            _botUser = "Support Live Chat";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserLiveChatConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.Name} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserLiveChatConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.Name} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserLiveChatConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.Name, message);
            }
        }

        public async Task NotifySupport(string message)
        {
            await Clients.All.SendAsync("NotifySupport", "NeedSupport");
        }

        public async Task SupportBusy(string message)
        {
            await Clients.All.SendAsync("SupportBusy", message);
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.Name);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}
