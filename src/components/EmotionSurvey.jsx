import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoodTestAPI from "../services/moodTest/moodTestAPI";

export default function EmotionSurvey() {
 

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [emotionalState, setEmotionalState] = useState("");
  const [question, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const api = new MoodTestAPI();
        const response = await api.getMoodTest();
        setQuestions(response.data); // Lưu trữ dữ liệu câu hỏi từ API vào state
      } catch (error) {
        console.error("Error fetching mood test questions:", error);
      }
    };

    fetchQuestions(); // Gọi hàm để lấy dữ liệu khi component được render
  }, []);

  const handleAnswerSelect = (questionId, optionId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));

    // Kiểm tra nếu đã trả lời hết tất cả các câu hỏi
    if (Object.keys(selectedAnswers).length + 1 === question.length) {
      calculateEmotionalState(); // Nếu đã trả lời hết, tính toán kết quả cảm xúc
    }
  };
  const calculateEmotionalState = () => {
    const totalScore = Object.values(selectedAnswers).reduce((acc, answer) => {
      const answerScore = { a: 2, b: 1, c: 0 };
      return acc + answerScore[answer];
    }, 0);
    console.log(totalScore);

    if (totalScore >= 19) {
      setEmotionalState(
        "Tâm trạng tích cực và tự tin 😍: Bạn thường cảm thấy tự tin và sẵn lòng đối mặt với thách thức, tận dụng cơ hội để phát triển bản thân và thể hiện sự quyết tâm. Nhưng sau trong thâm tâm ban có thực sự như thế không"
      );
    } else if (totalScore >= 15 && totalScore < 19) {
      setEmotionalState(
        "Tâm trạng ổn định và bình tĩnh 😊: Bạn có khả năng duy trì tình trạng bình tĩnh và cân nhắc trong các tình huống khó khăn, không bị chi phối bởi cảm xúc tiêu cực. Dù muốn duy trì tâm trạng tích cực và tự tin, nhưng đôi khi khó khăn vẫn luôn đeo bám và khiến tâm hồn mệt mỏi."
      );
    } else if (totalScore >= 11 && totalScore < 15) {
      setEmotionalState(
        "Tâm trạng lo lắng và phản ứng tiêu cực 😣: Bạn có xu hướng lo lắng, căng thẳng và phản ứng tiêu cực đối với các tình huống áp đặt hoặc không công bằng. Dù đang trải qua tâm trạng lo lắng và phản ứng tiêu cực, nhưng tôi tin rằng có thể tìm ra cách để vượt qua và học hỏi từ những trải nghiệm này"
      );
    } else if (totalScore >= 6 && totalScore < 11) {
      setEmotionalState(
        "Tâm trạng chán nản và mất niềm tin 🥲: Bạn thường cảm thấy chán nản và mất niềm tin khi gặp phải khó khăn, có thể cảm thấy mất hứng thú và muốn từ bỏ, và có khả năng bị. Mặc dù đang trải qua tâm trạng chán nản và mất niềm tin, nhưng tôi vẫn tin rằng mọi khó khăn đều có thể được vượt qua và sẽ tìm thấy nguồn động viên để tiếp tục tiến lên. "
      );
    } else {
      setEmotionalState(
        "Tâm trạng khó chịu và tức giận 😡: Bạn có thể trải qua cảm xúc tức giận, ghen tức hoặc khó chịu khi đối mặt với các tình huống không mong muốn hoặc bất công. Nhưng cố lên tôi tin bạn sẽ là người vượt qua tất cả"
      );
    }
  };
  const handleReset = () => {
    setSelectedAnswers({});
    setEmotionalState("");
  };

  return (
    <Container className="containers">
      <h1> 😉😍😊Bài kiểm tra cảm xúc😣🥲😡</h1>
      <p>
        Đừng lo lắng về mất phương hướng trong cuộc sống. Hãy tham gia vào bài
        kiểm tra cảm xúc của chúng tôi để hiểu rõ hơn về bản thân và nhận được
        các biện pháp chữa lành phù hợp nhất. Bắt đầu hành trình của bạn để tìm
        ra lối thoát và tạo ra một cuộc sống hạnh phúc hơn ngay bây giờ!
      </p>
      <form>
        {question.map((question) => (
          <div key={question.id}>
            {question.attributes?.name && (
              <>
                <h3>{question.attributes.name.question}</h3>
                {question.attributes.name.options.map((option) => (
                  <div className="radio-container" key={option.id}>
                    <input
                      type="radio"
                      id={`${question.id}-${option.id}`}
                      name={question.id}
                      value={option.id}
                      checked={selectedAnswers[question.id] === option.id}
                      onChange={() =>
                        handleAnswerSelect(question.id, option.id)
                      }
                    />
                    <label htmlFor={`${question.id}-${option.id}`}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </form>
      {emotionalState && (
        <div className="result">
          <h2>
            Theo như nghiên cứu các câu trả lời của bạn chúng tôi đưa ra kết của
            sau
          </h2>
          <p>{emotionalState}</p>
          <button onClick={handleReset}>Làm lại bài test</button>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 50px;
  }
  p {
    font-size: var(--font-size-small);
    text-align: center;
    padding: 0 50px 50px;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    div {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 20px;
    }
  }
  .result {
    margin: 20px 0;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 20px;
    p {
      font-size: var(--font-size-normal);
    }
    button {
      text-align: center;
      color: var(--primary-color);
      border: var(--primary-color) 1px solid;
      border-radius: 20px;
      padding: 10px 20px;
    }
  }
  .radio-container {
    display: inline-block; /* Hiển thị theo chiều ngang */
    margin-right: 10px; /* Khoảng cách giữa các nút */
    width: 100%;
    label {
      cursor: pointer;
    }
  }

  .radio-container input[type="radio"] {
    appearance: none; /* Loại bỏ giao diện mặc định của input radio */
    width: 20px; /* Độ rộng */
    height: 20px; /* Độ cao */
    border-radius: 50%; /* Bo tròn */
    border: 2px solid #999; /* Viền */
    outline: none; /* Loại bỏ viền khi được focus */
    cursor: pointer; /* Con trỏ chuột */
    margin-right: 5px; /* Khoảng cách giữa nút và nhãn */
  }

  .radio-container input[type="radio"]:checked {
    background-color: var(--primary-color); /* Màu nền khi được chọn */
  }

  //reponsive
  @media (max-width: 430px){
    h1{
      font-size:21px;
    }
    p{
      padding: 0 10px 10px;
    }
    form{
      grid-template-columns: 1fr;
      div{
        padding: 10px;
      }
    }
  }
`;
