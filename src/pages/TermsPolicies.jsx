import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Floating from "../components/Floating";
import { CAccordion } from "@coreui/react";
import { CAccordionBody } from "@coreui/react";
import { CAccordionHeader } from "@coreui/react";
import { CAccordionItem } from "@coreui/react";
import { useLocation } from "react-router-dom";

export default function TermsPolicies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <Container>
      <Header />
      <Floating />
      <div className="containers ruler">
        <h1>ĐIỀU KHOẢN VÀ CHÍNH SÁCH</h1>
        <CAccordion activeItemKey={type}>
          <CAccordionItem itemKey={"dat-cho-thanh-toan"}>
            <CAccordionHeader>
              Chính sách đặt chỗ và thanh toán
            </CAccordionHeader>
            <CAccordionBody>
              <ul>
                <li>
                  Việc thanh toán online được áp dụng cho tất cả các show diễn
                  của Âm Nhạc Chữa Lành.
                </li>
                <li>
                  Ban tổ chức (BTC) chỉ áp dụng duy nhất một chương trình ưu đãi
                  cho một đơn hàng.
                </li>
                <li>
                  Các mã giảm giá chỉ áp dụng khi đặt chỗ trực tiếp tại website
                  Âm Nhạc Chữa Lành
                </li>
                <li>
                  BTC không hỗ trợ hoàn tiền dưới mọi hình thức, vì vậy rất mong
                  Quý khách kiểm&nbsp;tra kĩ các thông tin trước khi tiến hành
                  xác nhận đặt chỗ và thanh toán trực tuyến.
                </li>
              </ul>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={"kieu-nai"}>
            <CAccordionHeader>Chính sách sử lý kiếu nại</CAccordionHeader>
            <CAccordionBody>
              <ul>
                <li>
                  BTC tiếp nhận mọi khiếu nại của Quý khách liên quan đến việc
                  sử dụng dịch vụ của Âm Nhạc Chữa Lành thông qua địa chỉ điện
                  tử: amnhacchualanh@gmail.com
                </li>
              </ul>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={"huy"}>
            <CAccordionHeader>Chính sách hủy</CAccordionHeader>
            <CAccordionBody>
              <ul>
                <li>Đơn hàng đã đặt không được đổi trả, hoàn tiền.</li>
                <li>
                  Đơn hàng sẽ được hoàn tiền nếu lỗi cho BTC hoặc trang website.
                </li>
              </ul>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={"bao-luu"}>
            <CAccordionHeader>Chính sách bảo lưu</CAccordionHeader>
            <CAccordionBody>
              <ul>
                <li>
                  Đối với trường hợp bảo lưu đơn đã đặt, cần thông báo đến bộ
                  phận Chăm sóc Khách Hàng của&nbsp;Âm Nhạc Chữa Lành 24h trước
                  khi buổi diễn bắt đầu. (Sau khoảng thời gian trên BTC sẽ không
                  hỗ trợ)
                </li>
                <li>
                  Thời hạn bảo lưu là 06 tháng tính từ ngày được xác nhận bảo
                  lưu.
                </li>
              </ul>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={"tam-ngung"}>
            <CAccordionHeader>
              Chính sách tạm ngưng biểu diễn do trường hợp bất khả kháng
            </CAccordionHeader>
            <CAccordionBody>
              <ul>
                <li>
                  Trường hợp tạm ngưng biểu diễn nghệ thuật do bất khả kháng
                  (các sự kiện tự nhiên như&nbsp;động đất, thiên tai, bão,
                  lũ,…., phía ca sĩ không thể tham gia biểu diễn vì lý do sức
                  khỏe, lịch trình cá nhân thay đổi đột xuất hoặc do quyết định
                  của cơ quan nhà nước có thẩm quyền không cho phép tổ chức,…)
                </li>
                <li>
                  Trường hợp BTC thay đổi thời gian, địa điểm hoặc các yêu tố có
                  liên quan đến buổi biểu diễn nghệ thuật BTC sẽ chủ động liên
                  hệ với Quý khách để hỗ trợ (Hoàn tiền hoặc chuyển đổi show
                  diễn, đối với trường hợp hoàn tiền sẽ được thanh toán trong
                  vòng 7-10 ngày sau khi xác nhận)
                </li>
                <li>
                  Khi sử dụng dịch vụ thanh toán trực tuyến từ website Âm Nhạc
                  Chữa Lành bạn đã hoàn toàn đồng ý với các chính sách và điều
                  khoản sử dụng của chúng tôi. Chúng tôi sẽ không chịu trách
                  nhiệm khi Quý khách không thực hiện đúng với các quy định
                  trong điều khoản này!
                </li>
              </ul>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={"bao-mat"}>
            <CAccordionHeader>Chính sách bảo mât</CAccordionHeader>
            <CAccordionBody>
              <div className="privacy-policy">
                <ol>
                  <li>
                    <strong>Mục đích và phạm vi thu thập thông tin:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Âm Nhạc Chữa Lành không bán, chia sẻ hay trao đổi thông tin
                    cá nhân của Quý khách thu thập trên trang web cho một bên
                    thứ ba nào khác.
                  </li>
                  <li>
                    Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong
                    nội bộ công ty.
                  </li>
                  <li>
                    Khi khách hàng liên hệ đăng ký dịch vụ, thông tin cá nhân mà
                    Âm Nhạc Chữa Lành thu thập bao gồm:
                    <br />
                    Họ và tên
                    <br />
                    Điện thoại
                    <br />
                    Email
                    <br />
                    Ngoài thông tin cá nhân là các thông tin về dịch vụ
                    <br />
                    Thông tin vị trí
                    <br />
                    Số lượng
                  </li>
                </ul>
                <ol start="2">
                  <li>
                    <strong>Phạm vi sử dụng thông tin:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Thông tin cá nhân thu thập được sẽ chỉ được Âm Nhạc Chữa
                    Lành sử dụng trong nội bộ công ty và cho một hoặc tất cả các
                    mục đích sau đây:
                    <br />– Hỗ trợ khách hàng
                    <br />– Cung cấp thông tin liên quan đến dịch vụ
                    <br />– Xử lý đơn hàng, cung cấp dịch vụ và thông tin qua
                    trang web của BTC theo yêu cầu của Quý khách
                    <br />– BTC có thể sẽ gửi thông tin đặt chỗ, dịch vụ mới,
                    thông tin về các sự kiện sắp tới hoặc thông tin tuyển dụng
                    nếu Quý khách đăng kí nhận email thông báo.
                    <br />– Ngoài ra, BTC sẽ sử dụng thông tin Quý khách cung
                    cấp để hỗ trợ quản lý tài khoản khách hàng; xác nhận và thực
                    hiện các giao dịch tài chính liên quan đến các khoản thanh
                    toán trực tuyến.
                  </li>
                </ul>
                <ol start="3">
                  <li>
                    <strong>Thời gian lưu trữ thông tin:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Đối với thông tin cá nhân, Âm Nhạc Chữa Lành chỉ xóa đi dữ
                    liệu này nếu Quý khách có yêu cầu, khách hàng yêu cầu gửi
                    mail về Âm Nhạc Chữa Lành
                  </li>
                </ul>
                <ol start="4">
                  <li>
                    <strong>
                      Những người hoặc tổ chức có thể được tiếp cận với thông
                      tin cá nhân:
                    </strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Đối tượng được tiếp cận với thông tin cá nhân của khách hàng
                    thuộc một trong những trường hợp sau:
                    <br />– Các Công ty hợp tác.
                    <br />– Các đối tác có ký hợp đồng thực hiện 1 phần dịch vụ
                    do CÔNG TY CỔ PHẦN Âm Nhạc Chữa Lành. Các đối tác này sẽ
                    nhận được những thông tin theo thỏa thuận hợp đồng (có thể 1
                    phần hoặc toàn bộ thông tin tuỳ theo điều khoản hợp đồng) để
                    tiến hành hỗ trợ người dùng sử dụng dịch vụ do Công ty cung
                    cấp.
                  </li>
                </ul>
                <ol start="5">
                  <li>
                    <strong>
                      Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân:
                    </strong>
                  </li>
                </ol>
                <ul>
                  <li>Địa chỉ: 1 Nguyễn Văn Trỗi, P2, Đà Lạt, Lâm Đồng</li>
                  <li>Điện thoại: 0975.934.200</li>
                  <li>Website: Âm Nhạc Chữa Lành</li>
                  <li>Email: amnhacchualanh@gmail.com</li>
                </ul>
                <ol start="6">
                  <li>
                    <strong>
                      Phương tiện – công cụ để người dùng tiếp cận dữ liệu cá
                      nhân của mình:
                    </strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Quý khách có thể tiếp cận qua trang web, email liên hệ đặt
                    chỗ, dịch vụ gửi về địa chỉ điện tử của BTC: Âm Nhạc Chữa
                    Lành, số điện thoại: 0975.934.200
                  </li>
                </ul>
                <ol start="7">
                  <li>
                    <strong>
                      Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu
                      dùng liên quan đến việc thông tin cá nhân bị sử dụng sai
                      mục đích hoặc phạm vi đã thông báo
                    </strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    Tại Âm Nhạc Chữa Lành , việc bảo vệ thông tin cá nhân của
                    Quý khách là ưu tiên hàng đầu, khách hàng được đảm bảo rằng
                    thông tin cung cấp sẽ được Âm Nhạc Chữa Lành cam kết không
                    chia sẻ, bán hoặc cho thuê thông tin cá nhân đối với bất kỳ
                    người nào khác. Âm Nhạc Chữa Lành cam kết chỉ sử dụng các
                    thông tin của Quý khách vào các trường hợp sau:
                    <br />– Nâng cao chất lượng dịch vụ dành cho khách hàng
                    <br />– Giải quyết các tranh chấp, khiếu nại
                    <br />– Khi cơ quan pháp luật có yêu cầu.
                  </li>
                  <li>
                    BTC hiểu rằng quyền lợi của Quý khách trong việc bảo vệ
                    thông tin cá nhân cũng chính là trách nhiệm của chúng tôi,
                    nên trong bất kỳ trường hợp có thắc mắc, góp ý liên quan đến
                    chính sách bảo mật của Âm Nhạc Chữa Lành, liên quan đến việc
                    thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã
                    thông báo vui lòng liên hệ qua số hotline 0975.934.200 hoặc
                    email: amnhacchualanh@gmail.com
                  </li>
                </ul>
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  .header div a {
    color: var(--text-title-color);
  }
  div h1 {
    margin: 100px 0;
    text-align: center;
  }
  .ruler {
    margin-bottom: 100px;
  }
  .hamburger-react {
    color: var(--text-title-color) !important;
  }
`;
