export interface MindMapNode {
  id: string;
  title: string;
  subtitle?: string;
  points: string[];
  icon: string; // we will map this to Lucide icons in the component
  children?: MindMapNode[];
  isConclusion?: boolean;
}

export const mindmapData: MindMapNode = {
  id: 'root',
  title: 'LỜI NGUYỀN CỦA VUA MIDAS',
  subtitle: 'Nhiều vàng có thật sự là giàu có?',
  points: [],
  icon: 'Crown',
  children: [
    {
      id: 'branch-1',
      title: '01. CÂU CHUYỆN MIDAS',
      points: [],
      icon: 'Sparkles',
      children: [
        {
          id: 'b1-c1',
          title: 'Câu chuyện',
          points: [
            'Midas được ban điều ước',
            'Mọi thứ chạm vào đều biến thành vàng',
            'Không thể ăn uống',
            'Nhận ra điều ước trở thành tai họa'
          ],
          icon: 'Crown'
        },
        {
          id: 'b1-c2',
          title: 'Vấn đề kinh tế',
          points: [
            'Nhiều vàng ≠ chắc chắn nhiều của cải',
            'Tiền/vàng không phải toàn bộ của cải xã hội',
            'Đặt câu hỏi: "Tiền thực sự là gì?"'
          ],
          icon: 'HelpCircle'
        }
      ]
    },
    {
      id: 'branch-2',
      title: '02. TIỀN ĐẾN TỪ ĐÂU?',
      points: [],
      icon: 'Coins',
      children: [
        {
          id: 'b2-c1',
          title: 'Hình thái giá trị',
          points: [
            'Hình thái giản đơn / ngẫu nhiên',
            'Hình thái đầy đủ / mở rộng',
            'Hình thái chung',
            'Hình thái tiền'
          ],
          icon: 'TrendingUp'
        },
        {
          id: 'b2-c2',
          title: 'Vì sao cần tiền?',
          points: [
            'Sản xuất hàng hóa phát triển',
            'Phân công lao động xã hội phát triển',
            'Thị trường mở rộng',
            'Nhiều vật ngang giá chung gây trở ngại',
            'Xuất hiện nhu cầu về một vật ngang giá chung thống nhất'
          ],
          icon: 'Globe'
        },
        {
          id: 'b2-c3',
          title: 'Bản chất',
          points: [
            'Tiền là một loại hàng hóa đặc biệt',
            'Là vật ngang giá chung',
            'Là hình thái biểu hiện giá trị của hàng hóa'
          ],
          icon: 'Wallet'
        }
      ]
    },
    {
      id: 'branch-3',
      title: '03. VÌ SAO VÀNG TRỞ THÀNH TIỀN?',
      points: [],
      icon: 'Gem',
      children: [
        {
          id: 'b3-c1',
          title: 'Vai trò lịch sử',
          points: ['Vàng từng đảm nhận vai trò vật ngang giá chung'],
          icon: 'History'
        },
        {
          id: 'b3-c2',
          title: 'Đặc điểm của vàng',
          points: [
            'Có giá trị & giá trị sử dụng',
            'Có giá trị trao đổi',
            'Là sản phẩm của lao động xã hội',
            'Dễ bảo quản / tích trữ lâu dài',
            'Được xã hội thừa nhận trong vai trò vật ngang giá chung'
          ],
          icon: 'CheckCircle'
        },
        {
          id: 'b3-c3',
          title: 'Kết luận',
          points: ['Vàng trở thành hình thái tiền của giá trị.'],
          icon: 'Award'
        }
      ]
    },
    {
      id: 'branch-4',
      title: '04. 5 "KHUÔN MẶT" CỦA TIỀN',
      points: [],
      icon: 'Briefcase',
      children: [
        {
          id: 'b4-c1',
          title: '1. Thước đo giá trị',
          points: ['Biểu hiện giá trị của hàng hóa qua giá cả'],
          icon: 'Scale'
        },
        {
          id: 'b4-c2',
          title: '2. Phương tiện lưu thông',
          points: ['Làm môi giới cho quá trình trao đổi hàng hóa'],
          icon: 'Repeat'
        },
        {
          id: 'b4-c3',
          title: '3. Phương tiện cất trữ',
          points: ['Rút khỏi lưu thông để dự trữ và đưa trở lại khi cần'],
          icon: 'Safe'
        },
        {
          id: 'b4-c4',
          title: '4. Phương tiện thanh toán',
          points: ['Trả nợ, mua chịu, thực hiện nghĩa vụ thanh toán'],
          icon: 'CreditCard'
        },
        {
          id: 'b4-c5',
          title: '5. Tiền tệ thế giới',
          points: ['Thanh toán và mua bán quốc tế'],
          icon: 'Globe2'
        }
      ]
    },
    {
      id: 'branch-5',
      title: '05. BẪY MIDAS',
      subtitle: 'Nhiều vàng có thật sự là nhiều của cải?',
      points: ['Tiền / giá tài sản tăng ≠ Của cải xã hội tự động tăng'],
      icon: 'AlertTriangle',
      children: [
        {
          id: 'b5-c1',
          title: 'Quyền sử dụng đất',
          points: [
            'Tiền đổi chủ, QSDĐ đổi chủ',
            'Giao dịch không tự động tạo thêm hàng hóa/dịch vụ',
            'Cá nhân có thể giàu lên về tiền',
            'Nhưng không suy ra toàn xã hội giàu thêm tương ứng'
          ],
          icon: 'Home'
        },
        {
          id: 'b5-c2',
          title: 'Thương hiệu',
          points: [
            'Có thể được định giá và trao đổi',
            'Gắn với lao động, trí tuệ, thời gian',
            'Phải có sản phẩm / dịch vụ thực phía sau',
            'Không thể chỉ dựa vào danh tiếng rỗng'
          ],
          icon: 'Tag'
        },
        {
          id: 'b5-c3',
          title: 'Chứng khoán',
          points: [
            'Là "tư bản giả", gắn với lợi ích kinh tế kỳ vọng',
            'Giá chứng khoán tăng, cá nhân có thể giàu lên',
            'Nhưng mua bán trên thị trường thứ cấp không tự động tạo ra của cải thực',
            'VD: A mua 20k → bán 100k. A lãi 80k nhưng xã hội không nhất thiết giàu thêm 80k.'
          ],
          icon: 'LineChart'
        },
        {
          id: 'b5-c4',
          title: 'Dịch vụ',
          points: [
            'Là hàng hóa vô hình, có hao phí lao động',
            'Thỏa mãn nhu cầu, không thể cất trữ',
            'Sản xuất và tiêu dùng diễn ra đồng thời',
            'Trực tiếp tạo ra giá trị sử dụng (khác với chứng khoán)'
          ],
          icon: 'Users'
        }
      ]
    }
  ]
};
