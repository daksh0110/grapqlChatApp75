import { gql, useQuery } from '@apollo/client';

const GET_ALL_CHATS = gql`
  query GetMessages($senderId: String!, $receiverId: String!) {
    getMessages(senderId: $senderId, receiverId: $receiverId) {
      id
      content
      senderId
      receiverId
    }
  }
`;

const AllChats = () => {
  // Get user data from local storage
  const user = localStorage.getItem('User');
  if (!user) {
    throw new Error('User not found in local storage');
  }

  const parsedUser = JSON.parse(user); // Parse the JSON string to an object
  const userId = parsedUser.id; // Access the 'id' property

  // You can hard-code the receiverId for now, or use another user ID as needed
  const receiverId = '679b497d1c72fc1c46ae70a8'; // replace with actual receiver ID if available

  const { data, loading, error } = useQuery(GET_ALL_CHATS, {
    variables: { senderId: "679b4dafc9c60ef3d6677812", receiverId: receiverId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <div>
      <h3>All Chats</h3>
      {data.getMessages.map((message: any) => (
        <div key={message.id}>
          <p><strong>{message.senderId}:</strong> {message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AllChats;
