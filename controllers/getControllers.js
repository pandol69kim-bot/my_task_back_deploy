const database = require('../database/database');

// exports.getTasks_postgress = async (request, response) => {
//   const userId = request.params.userId;
//   // console.log(userId);

//   try {
//     const result = await database.pool.query(
//       'SELECT * FROM tasks WHERE userId = $1 ORDER BY created_at DESC',
//       [userId]
//     );
//     return response.status(200).json(result.rows);
//   } catch (error) {
//     return response.status(500).json({ message: `Get tasks Error: ${error}` });
//   }
// };



// exports.getTask_back = async (request, response) => {
//   const userId = request.params.userId;
//   try {
//     await database.pool.query(
//         'Select * from tasks WHERE userId = ? ORDER BY created_at DESC',
//         [userId], 
//         (err, results) => {

//           // 데이터를 가공해서 보냄
//             const formattedResults = results.map(todo => ({
//                 ...todo,
//                 // task가 Buffer라면 문자열로 변환
//                 _id: Buffer.isBuffer(todo._id) ? todo._id.toString('utf8') : todo._id,
//                 title: Buffer.isBuffer(todo.title) ? todo.title.toString('utf8') : todo.title,
//                 description: Buffer.isBuffer(todo.description) ? todo.description.toString('utf8') : todo.description,
//                 userId: Buffer.isBuffer(todo.userId) ? todo.userId.toString('utf8') : todo.userId,
//             }));
//       // console.log(formattedResults);
//       return response.status(200).json(formattedResults);//res.json(results);
//     })
//   } catch (error) {
//     return response.status(500).json({ message: `Get tasks Error: ${error}` });
//   }
// };


exports.getTasks = async (request, response)  => {
  const userId = request.params.userId;
  try {
    // 1. await를 사용하여 결과를 직접 받습니다. 
    // [results] 배열 구조 분해 할당을 사용합니다.
    const [results] = await database.pool.query(
        'Select * from tasks WHERE userId = ? ORDER BY created_at DESC',
        [userId]
    );

    // 2. 데이터를 가공합니다. (results가 이미 위에서 정의됨)
    const formattedResults = results.map(todo => ({
        ...todo,
        // Buffer 체크 및 변환 로직
        _id: Buffer.isBuffer(todo._id) ? todo._id.toString('utf8') : todo._id,
        title: Buffer.isBuffer(todo.title) ? todo.title.toString('utf8') : todo.title,
        description: Buffer.isBuffer(todo.description) ? todo.description.toString('utf8') : todo.description,
        userId: Buffer.isBuffer(todo.userId) ? todo.userId.toString('utf8') : todo.userId,
    }));
    // 3. 가공된 결과를 응답하고 함수를 종료합니다.
    return response.status(200).json(formattedResults);
  } catch (error) {
      // 4. 에러 처리
      console.error("Get tasks Erro:", error);
      if (!response.headersSent) {
        return response.status(500).json({ message: `Get tasks Error: ${error}` });
      };
  };
};





