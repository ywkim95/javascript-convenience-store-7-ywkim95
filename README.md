# javascript-convenience-store-precourse
### 기능 도출
- 최신 상품(품명, 재고수, 프로모션) 내역을 보여준다.
- 상품과 구매 수를 입력받는다.
- 각 상품의 재고 수량을 확인하고 재고 1 이상이면 결제가 가능하다.
  - 입력한 구매 수가 재고 수를 초과하면 에러를 발생시킨다.
- 각 상품의 재고 수량을 확인하고 재고 0 이하이면 결제가 불가능하다.
- 각 상품을 구매하면, 구매한 수량만큼 재고를 차감한다.
  - 구매한 뒤 재고는 감소되어있어야한다.
- 오늘 날짜를 확인하여 프로모션의 기간 내인 경우 할인을 적용한다.
- 프로모션이 지정된 상품에 한해 프로모션을 적용한다.
  - 프로모션을 적용할 경우 다른 프로모션 또는 할인을 적용하지 않는다.
- 프로모션이 지정되어있지 않은 상품에는 프로모션을 적용하지 않는다.
- 프로모션의 재고 수를 초과한 경우 초과한 재고를 일반 재고에서 사용한다.
  - 프로모션 상품을 구매할 때 초과해서 가져오면 프로모션 미적용되는 수량의 구매 여부를 묻는다.
    - Y를 입력하면 프로모션을 적용하지 않은 수량을 추가한다.
    - N을 입력하면 프로모션을 적용하지 않은 수량을 제거한다.
  - 프로모션 상품을 구매할 때 적게 가져오면 혜택을 안내하고 수량 추가여부를 묻는다.
    - Y를 입력하면 수량을 추가한다.
    - N을 입력하면 수량을 추가하지 않는다.
- 멤버십 할인 여부를 묻는다.
  - Y를 입력하면 할인을 적용한다.
  - N을 입력하면 할인을 적용하지 않는다.
- 멤버십 할인은 프로모션이 적용된 상품을 제외한 뒤 할인을 한다.
- 멤버십 할인의 최대한도는 8,000원이다.
- 구매한 내역의 상품명, 구매 수량, 금액, 증정 상품, 총구매액, 행사할인금액, 멤버십할인금액, 지불한 금액을 출력한다.
- 재구매 여부를 묻는다.
  - Y를 입력하면 기능 도출의 처음부터 다시 시작한다.
  - N을 입력하면 프로그램이 종료된다.

### 예외 처리
- 상품명 및 수량에 대하여 입력방식이 옳지 않은 경우
  - 입력한 각 포멧이 \[상품명-수량\]이 아닌 경우
  - 존재하지 않는 상품을 입력한 경우
  - 프로모션 + 일반 재고를 합한 수량을 초과하여 입력한 경우
    - 이 경우에 관해서는 초과한 수량에 대해서 전체 구매를 할 지 물어보도록 처리하는 방법도 있다.
  - 쉼표 대신 다른 구분자를 입력하는 경우
  - 각 구분자(\-, ,)사이에 공백이 들어간 경우
    - trim()으로 처리하도록 해본다.
- 프로모션 적용이 가능한 상품에 대해 고객이 해당 수량만큼 가져오지 않았을 경우에 대한 메시지 처리가 옳지 않은 경우
  - 빈 값이 들어오는 경우
  - Y/N이 아닌 경우
- 프로모션 재고가 부족하여 일부 수량을 프로모션 혜택 없이 결제해야 하는 경우에 대한 메시지 처리가 옳지 않은 경우
  - 빈 값이 들어오는 경우
  - Y/N이 아닌 경우
- 멤버십 할인의 입력방식이 옳지 않은 경우
  - 빈 값이 들어오는 경우
  - Y/N이 아닌 경우
- 재구매 여부에 대한 입력방식이 옳지 않은 경우
  - 빈 값이 들어오는 경우
  - Y/N이 아닌 경우