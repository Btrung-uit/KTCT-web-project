export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Theo câu chuyện Midas, nghịch lý lớn nhất mà nhà vua gặp phải là gì?",
    options: [
      "Có quá ít vàng để sử dụng",
      "Có rất nhiều vàng nhưng vàng không thể trực tiếp đáp ứng mọi nhu cầu",
      "Vàng ngày càng mất giá",
      "Không ai muốn trao đổi vàng với ông"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 2,
    question: "Theo lý luận trong ebook, tiền xuất hiện là kết quả của quá trình nào?",
    options: [
      "Nhà nước phát minh ra tiền",
      "Vàng tự nhiên trở thành tiền",
      "Sự phát triển của sản xuất và trao đổi hàng hóa",
      "Con người muốn tích trữ tài sản"
    ],
    correctAnswer: 2,
    explanation: ""
  },
  {
    id: 3,
    question: "Có bao nhiêu hình thái biểu hiện của giá trị được trình bày trong ebook?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 2,
    explanation: ""
  },
  {
    id: 4,
    question: "Trong hình thái tiền, vàng giữ vai trò nào?",
    options: [
      "Hàng hóa tiêu dùng cuối cùng",
      "Vật ngang giá chung",
      "Phương tiện sản xuất",
      "Hàng hóa không có giá trị"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 5,
    question: "Phát biểu nào mô tả đúng bản chất của tiền theo ebook?",
    options: [
      "Tiền chỉ là một loại giấy do Nhà nước phát hành",
      "Tiền là một loại hàng hóa đặc biệt và là vật ngang giá chung",
      "Tiền chính là toàn bộ của cải xã hội",
      "Tiền chỉ có chức năng cất trữ"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 6,
    question: "Khi nói “một chiếc điện thoại có giá 10 triệu đồng”, tiền đang thực hiện chức năng nào?",
    options: [
      "Phương tiện cất trữ",
      "Phương tiện thanh toán",
      "Thước đo giá trị",
      "Tiền tệ thế giới"
    ],
    correctAnswer: 2,
    explanation: ""
  },
  {
    id: 7,
    question: "Khi tiền được dùng làm môi giới trong quá trình mua bán hàng hóa, tiền thực hiện chức năng nào?",
    options: [
      "Phương tiện lưu thông",
      "Phương tiện cất trữ",
      "Tiền tệ thế giới",
      "Thước đo giá trị"
    ],
    correctAnswer: 0,
    explanation: ""
  },
  {
    id: 8,
    question: "Khi tiền được rút khỏi lưu thông để dự trữ và sẵn sàng đưa trở lại lưu thông, đó là chức năng:",
    options: [
      "Thước đo giá trị",
      "Phương tiện cất trữ",
      "Phương tiện thanh toán",
      "Tiền tệ thế giới"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 9,
    question: "Một người dùng tiền để trả khoản nợ đã đến hạn. Tiền đang thực hiện chức năng nào?",
    options: [
      "Phương tiện lưu thông",
      "Phương tiện cất trữ",
      "Phương tiện thanh toán",
      "Thước đo giá trị"
    ],
    correctAnswer: 2,
    explanation: ""
  },
  {
    id: 10,
    question: "Khi trao đổi hàng hóa mở rộng giữa các quốc gia, tiền có thể thực hiện chức năng nào?",
    options: [
      "Phương tiện sản xuất",
      "Tiền tệ thế giới",
      "Phương tiện cất trữ",
      "Hàng hóa tiêu dùng"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 11,
    question: "Trong giao dịch quyền sử dụng đất, các bên thực chất trao đổi cái gì?",
    options: [
      "Đất đai tự nhiên",
      "Quyền sử dụng đất",
      "Lao động kết tinh trong đất",
      "Vàng"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 12,
    question: "Yếu tố nào sau đây được tài liệu đề cập là có thể ảnh hưởng đến giá cả quyền sử dụng đất?",
    options: [
      "Cung – cầu",
      "Đầu cơ",
      "Sự khan hiếm",
      "Tất cả các đáp án trên"
    ],
    correctAnswer: 3,
    explanation: ""
  },
  {
    id: 13,
    question: "A mua quyền sử dụng đất với giá 5 tỷ đồng và bán lại với giá 10 tỷ đồng. Kết luận nào phù hợp nhất với nội dung ebook?",
    options: [
      "Xã hội chắc chắn tạo ra thêm 5 tỷ đồng của cải",
      "A có khoản chênh lệch tiền 5 tỷ đồng, nhưng không thể từ đó kết luận xã hội tăng thêm 5 tỷ đồng của cải",
      "Đất đai đã trực tiếp tạo ra 5 tỷ đồng giá trị mới",
      "Giao dịch này không tạo ra bất kỳ thay đổi nào đối với A"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 14,
    question: "Theo tài liệu, thương hiệu có thể được mua bán và định giá cao chủ yếu trong trường hợp nào?",
    options: [
      "Khi thương hiệu tồn tại hoàn toàn độc lập với hoạt động kinh tế",
      "Khi thương hiệu gắn với quá trình sản xuất hàng hóa, dịch vụ thực",
      "Khi thương hiệu không cần lao động xây dựng",
      "Khi thương hiệu không có uy tín"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 15,
    question: "Theo cách phân tích trong ebook, bản chất của giao dịch chuyển nhượng cầu thủ bóng đá là gì?",
    options: [
      "Mua bán danh tiếng thuần túy",
      "Mua bán vàng",
      "Mua bán sức lao động để thực hiện hoạt động bóng đá",
      "Mua bán quyền sử dụng đất"
    ],
    correctAnswer: 2,
    explanation: ""
  },
  {
    id: 16,
    question: "Theo tài liệu nhóm, chứng khoán và chứng quyền được Marx gọi là:",
    options: [
      "Tư bản thực",
      "Tư bản giả",
      "Hàng hóa tiêu dùng",
      "Tư liệu sản xuất"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 17,
    question: "A mua một cổ phiếu với giá 20.000 đồng và bán lại với giá 100.000 đồng. Theo logic của ebook, phát biểu nào phù hợp nhất?",
    options: [
      "A có khoản chênh lệch 80.000 đồng; điều đó không tự động chứng minh xã hội tạo thêm 80.000 đồng hàng hóa và dịch vụ",
      "Xã hội chắc chắn tạo thêm 80.000 đồng của cải vật chất",
      "Cổ phiếu đã tạo ra trực tiếp một sản phẩm vật chất mới trị giá 80.000 đồng",
      "A không có bất kỳ khoản chênh lệch nào"
    ],
    correctAnswer: 0,
    explanation: ""
  },
  {
    id: 18,
    question: "Theo tài liệu, giá chứng khoán có thể chịu ảnh hưởng mạnh bởi yếu tố nào sau đây?",
    options: [
      "Kỳ vọng tương lai",
      "Tin đồn",
      "Đầu cơ và tâm lý đám đông",
      "Tất cả các đáp án trên"
    ],
    correctAnswer: 3,
    explanation: ""
  },
  {
    id: 19,
    question: "Phát biểu nào đúng về dịch vụ theo ebook?",
    options: [
      "Dịch vụ không phải là hàng hóa",
      "Dịch vụ là một loại hàng hóa vô hình và đòi hỏi hao phí sức lao động",
      "Dịch vụ luôn có thể cất trữ như hàng hóa thông thường",
      "Dịch vụ không nhằm thỏa mãn nhu cầu của con người"
    ],
    correctAnswer: 1,
    explanation: ""
  },
  {
    id: 20,
    question: "Bài học trung tâm mà câu chuyện Midas gợi ra trong ebook là gì?",
    options: [
      "Càng có nhiều tiền thì xã hội chắc chắn càng giàu",
      "Tiền và giá cả không có vai trò trong nền kinh tế",
      "Không nên đồng nhất sự gia tăng tiền hoặc giá tài sản với sự gia tăng tương ứng của cải xã hội",
      "Vàng không có bất kỳ giá trị kinh tế nào"
    ],
    correctAnswer: 2,
    explanation: ""
  }
];
