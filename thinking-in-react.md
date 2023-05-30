## Thinking in React

React는 당신이 보는 디자인과 구축하는 앱에 대한 생각 방식을 변경할 수 있습니다. React로 사용자 인터페이스를 구축할 때, 먼저 컴포넌트라고 불리는 조각으로 나누게 될 것입니다. 그런 다음, 각 컴포넌트의 다른 시각적 상태를 설명할 것입니다. 마지막으로, 데이터가 컴포넌트를 통해 흐를 수 있도록 컴포넌트를 연결할 것입니다. 이 튜토리얼에서는 React를 사용하여 검색 가능한 제품 데이터 테이블을 구축하는 과정을 안내해 드리겠습니다.

### 모의 설계로 시작해보세요

이미 JSON API와 디자이너로부터 모의 설계(mockup)를 갖고 있다고 상상해보세요.

JSON API는 다음과 같은 데이터를 반환합니다:

```
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

mockup 은 아래와 같습니다.

<img src="./notebook/assets/thinking-in-react1.png" width="30%" height="auto"/>

React에서 UI를 구현하기 위해서는 일반적으로 다음과 같은 다섯 가지 단계를 따릅니다:

#### Step 1: UI를 컴포넌트 계층으로 분할하기

먼저, 목업에서 각 컴포넌트와 하위 컴포넌트 주위에 상자를 그리고 그들에게 이름을 지정하는 방식으로 시작하세요. 디자이너와 함께 작업한다면, 그들은 이미 디자인 도구에서 이러한 컴포넌트들에 이름을 지정했을 수 있습니다. 디자이너에게 물어보세요!

배경에 따라서, 디자인을 컴포넌트로 분할하는 다양한 방법으로 생각할 수 있습니다:

**프로그래밍** - 새로운 함수 또는 객체를 만들어야 할지 결정하는 데 사용하는 기법과 동일한 기법을 사용하세요. 이러한 기법 중 하나는 [단일 책임 원칙](https://en.wikipedia.org/wiki/Single-responsibility_principle)으로, 컴포넌트는 이상적으로 하나의 작업만 수행해야 합니다. 그렇지 않으면 컴포넌트가 점점 커지면서 작은 하위 컴포넌트로 분해되어야 합니다.

**CSS** - 클래스 선택자를 만들어야 할 부분을 생각해보세요. (하지만 컴포넌트는 조금 더 상세하게 분할됩니다.)

**디자인** - 디자인의 레이어를 어떻게 구성할지 생각해보세요.

JSON이 잘 구조화되어 있다면, UI의 컴포넌트 구조와 자연스럽게 매핑될 수 있습니다. 왜냐하면 UI와 데이터 모델은 종종 동일한 정보 구조, 즉 동일한 형태를 가지기 때문입니다. UI를 데이터 모델의 각 조각과 일치하는 컴포넌트로 분할하세요.

이 화면에는 다음과 같이 다섯 개의 컴포넌트가 있습니다:

<img src="./notebook/assets/thinking-in-react2.png" width="60%" height="auto"/>

1. `FilterableProductTable` 은 전체 앱을 포함합니다.
2. `SearchBar`는 사용자 입력을 받습니다.
3. `ProductTable`은 사용자 입력에 따라 목록을 표시하고 필터링합니다.
4. `ProductCategoryRow` 는 각 카테고리에 대한 제목을 표시합니다.
5. `ProductRow` 는 각 제품에 대한 행을 표시합니다.

만약 `ProductTable`을 살펴보면, `Name`과 `Price` 라벨을 포함한 테이블 헤더가 별도의 컴포넌트가 아닙니다. 이것은 개인적인 선호에 따라 다를 수 있으며 양쪽 방법 중 하나를 선택할 수 있습니다. 이 예시에서는 `ProductTable`의 일부로 처리되었습니다. 하지만 이 헤더가 복잡해진다면 (예: 정렬 기능 추가) 별도의 `ProductTableHeader` 컴포넌트로 분리할 수 있습니다.

이제 목업에서 컴포넌트를 식별했으므로, 이를 계층적으로 정렬하세요. 목업에서 다른 컴포넌트 내에 나타나는 컴포넌트는 계층에서 자식으로 나타나야 합니다:

- FilterableProductTable
    - SearchBar
    - ProductTable
        - ProductCategoryRow
        - ProductRow

#### Step 2: React에서 정적 버전 구축하기

이제 컴포넌트 계층 구조가 준비되었으므로 앱을 구현할 차례입니다. 가장 직관적인 접근 방식은 상호작용을 추가하지 않고 데이터 모델에서 UI를 렌더링하는 버전을 먼저 구축하는 것입니다! 정적 버전을 먼저 구축하고 나중에 상호작용을 추가하는 것이 종종 더 쉽습니다. 정적 버전 구축은 타이핑은 많이 하지만 고민은 거의 없는 반면, 상호작용을 추가하는 것은 많이 고민하고 타이핑은 적게 필요합니다.

데이터 모델을 렌더링하는 정적 버전의 앱을 구축하기 위해, 다른 [컴포넌트](https://react.dev/learn/your-first-component)를 재사용하고 [props](https://react.dev/learn/passing-props-to-a-component)를 사용하여 데이터를 전달하는 컴포넌트를 구축해야 합니다. Props는 부모에서 자식으로 데이터를 전달하는 방법입니다. ([상태(state)](https://react.dev/learn/state-a-components-memory)의 개념에 익숙하다면, 이 정적 버전을 구축할 때는 상태를 전혀 사용하지 마세요. 상태는 상호작용을 위해 예약되어 있으며, 시간에 따라 변경되는 데이터를 다룹니다. 이 정적 버전에서는 상태가 필요하지 않습니다.)

두 가지 방법으로 구현할 수 있습니다. "위에서 아래로(top-down)" 구성 요소를 구축하면서 시작할 수도 있고 (FilterableProductTable과 같은 계층 구조의 상위 구성 요소부터 시작), "아래에서 위로(bottom-up)"로 구성 요소를 작업하면서 시작할 수도 있습니다 (ProductRow와 같은 하위 구성 요소부터 시작). 간단한 예제에서는 일반적으로 위에서 아래로 구성하는 것이 더 쉽지만, 큰 프로젝트에서는 아래에서 위로 구성하는 것이 더 쉽습니다.

<details>
<summary> app.jsx 예시보기 </summary>

```
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```
</details>


(이 코드가 어렵게 보인다면, 먼저 [Quick Start](https://react.dev/learn)를 따라해보세요!)

컴포넌트를 구축한 후에는 데이터 모델을 렌더링하는 재사용 가능한 컴포넌트 라이브러리가 생성됩니다. 이 정적 앱에서는 컴포넌트가 JSX를 반환할 뿐입니다. 계층 구조의 맨 위에 있는 컴포넌트(FilterableProductTable)는 데이터 모델을 prop으로 받습니다. 이는 단방향 데이터 흐름이라고 불리며, 데이터는 최상위 컴포넌트에서 아래쪽으로 흐릅니다.

#### Step 3: UI 상태의 최소한이면서 완전한 표현 찾기

UI를 상호작용적으로 만들려면 사용자가 기본 데이터 모델을 변경할 수 있어야 합니다. 이를 위해 상태(state)를 사용할 것입니다.

상태(state)는 앱이 기억해야 할 최소한의 변경 데이터 집합으로 생각하세요. 상태를 구조화하는 가장 중요한 원칙은 [DRY(Don't Repeat Yourself)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)를 유지하는 것입니다. 애플리케이션에 필요한 상태의 절대적인 최소 표현을 찾고, 나머지는 필요할 때 계산합니다. 예를 들어, 쇼핑 목록을 만드는 경우, 항목을 배열로 상태에 저장할 수 있습니다. 목록에 있는 항목의 수도 표시하고 싶다면, 항목 수를 다른 상태 값으로 저장하지 않고 배열의 길이를 읽어들입니다.

이 예시 애플리케이션의 데이터 조각을 생각해보세요:

1. 원본 제품 목록
2. 사용자가 입력한 검색 텍스트
3. 체크박스의 값
4. 필터링된 제품 목록

이 중 어떤 것이 상태일까요? 상태가 아닌 것들을 식별해보세요:

- 시간이 지나도 변하지 않는가요? 그렇다면, 그것은 상태가 아닙니다.
- 부모로부터 props를 통해 전달되는가요? 그렇다면, 그것은 상태가 아닙니다.
- 컴포넌트 내에서 기존의 상태나 props를 기반으로 계산할 수 있나요? 그렇다면, 그것은 분명히 상태가 아닙니다!

남은 것이 상태일 가능성이 높습니다.
다시 하나씩 검토해보겠습니다:

1. 원본 제품 목록은 props로 전달되므로 상태가 아닙니다.
2. 검색 텍스트는 시간이 지나면서 변경되며, 다른 것에서 계산할 수 없으므로 상태인 것 같습니다.
3. 체크박스의 값도 시간이 지나면서 변경되며, 다른 것에서 계산할 수 없으므로 상태인 것 같습니다.
4. 필터링된 제품 목록은 원본 제품 목록을 기반으로 검색 텍스트와 체크박스의 값에 따라 계산할 수 있으므로 상태가 아닙니다.

따라서 검색 텍스트와 체크박스의 값만이 상태입니다! 잘 했습니다!

<details>
<summary>Props vs State</summary>

```
React에서는 "props"와 "state"라는 두 가지 유형의 "모델(model)" 데이터가 있습니다. 
이 둘은 매우 다릅니다:

- Props는 함수에 전달하는 인자와 같습니다. 부모 컴포넌트가 자식 컴포넌트로 데이터를 전달하고 외관을
 사용자 정의할 수 있도록 합니다. 예를 들어, Form 컴포넌트는 Button 컴포넌트에 color prop을 전달할 수 있습니다.

- State는 컴포넌트의 "기억"과 같습니다. 컴포넌트가 정보를 추적하고 상호작용에 응답하여 정보를 
변경할 수 있도록 합니다. 예를 들어, Button 컴포넌트는 isHovered라는 상태를 추적할 수 있습니다.

Props와 state는 서로 다르지만 함께 작동합니다. 

부모 컴포넌트는 종종 일부 정보를 상태로 유지하고 (변경할 수 있도록) 이를 자식 컴포넌트에 props로 전달합니다. 

처음 읽을 때는 아직 차이가 약간 흐릿할 수 있습니다. 실제로 이해하기 위해서는 약간의 실습이 필요합니다!
```
</details>

#### Step 4: 상태(state)가 어디에 위치해야 하는지 확인하기

애플리케이션의 최소한의 상태 데이터를 식별한 후, 상태를 변경하거나 소유하는 책임이 있는 컴포넌트를 식별해야 합니다. 기억하세요: React는 부모 컴포넌트에서 자식 컴포넌트로 컴포넌트 계층구조를 통해 데이터를 단방향으로 전달합니다. 어떤 컴포넌트가 어떤 상태를 소유해야 하는지 즉시 명확하지 않을 수 있습니다. 이 개념이 처음이라면 이 단계를 따라가며 해결할 수 있습니다!

애플리케이션의 각 상태(state) 조각에 대해 다음을 수행하세요:

1. 해당 상태(state)를 기반으로 렌더링하는 모든 컴포넌트를 식별합니다.
2. 그 컴포넌트들의 가장 가까운 공통 부모 컴포넌트를 찾습니다. 이는 계층구조에서 모두 상위에 있는 컴포넌트입니다.
3. 상태(state)가 위치할 곳을 결정합니다:
    1. 일반적으로, 상태를 공통 부모 컴포넌트에 직접 둘 수 있습니다.
    2. 공통 부모 컴포넌트보다 위에 있는 컴포넌트에 상태를 넣을 수도 있습니다.
    3. 상태를 소유할 수 있는 컴포넌트를 찾을 수 없는 경우, 상태를 보유하는 데만 사용되는 새로운 컴포넌트를 생성하고 공통 부모 컴포넌트의 위쪽 계층구조에 추가합니다.

이전 단계에서 이 애플리케이션에서 두 개의 상태를 찾았습니다: 검색 입력 텍스트와 체크박스의 값입니다. 이 예시에서는 항상 함께 나타나므로 동일한 위치에 넣는 것이 맞습니다.

이제 다음을 실행해봅시다:

1. 상태를 사용하는 컴포넌트를 식별합니다:
    - `ProductTable`은 해당 상태(검색 텍스트와 체크박스 값)를 기반으로 제품 목록을 필터링해야 합니다.
    - `SearchBar`는 해당 상태(검색 텍스트와 체크박스 값)를 표시해야 합니다.

2. 공통 부모를 찾습니다: 두 컴포넌트가 공유하는 첫 번째 부모 컴포넌트는 `FilterableProductTable`입니다.

3. 상태가 위치할 곳을 결정합니다: 상태 값들을 `FilterableProductTable`에 보존하겠습니다.
그래서 상태 값들은 `FilterableProductTable`에 위치하게 됩니다.

[useState() Hook](https://react.dev/reference/react/useState)을 사용하여 컴포넌트에 상태를 추가합니다. Hook은 React에 "hook into"할 수 있는 특수한 함수입니다. FilterableProductTable의 상단에 두 개의 상태 변수를 추가하고 초기 상태를 지정하세요:

```
function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
}
```

그런 다음, `filterText`와 `inStockOnly`를 props로 ProductTable과 SearchBar에 전달하세요:

```
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

애플리케이션이 어떻게 동작하는지 확인해볼 수 있습니다. 아래 샌드박스 코드에서 `filterText`의 초기값을 `useState('')`에서 `useState('fruit')`로 수정하세요. 그러면 검색 입력 텍스트와 테이블이 모두 업데이트되는 것을 확인할 수 있습니다.

<details>
<summary>
App.js
</summary>

```
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

</details>

위의 샌드박스에서 ProductTable과 SearchBar는 filterText와 inStockOnly props를 읽어 테이블, 입력 필드, 체크박스를 렌더링합니다. 예를 들어, 다음은 SearchBar가 입력 필드의 값을 채우는 방법입니다:

```
function SearchBar({filterText, inStockOnly}) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..." />
    );
}
```

사용자의 입력에 대응하기 위해 타이핑과 같은 동작에 대한 코드를 아직 추가하지 않았습니다. 이것이 최종 단계가 될 것입니다.

#### Step 5: 반대로 데이터 흐름을 추가합니다.

현재 앱은 상위 컴포넌트에서 하위 컴포넌트로 props와 state가 올바르게 흐르며 렌더링됩니다. 그러나 사용자 입력에 따라 상태를 변경하려면 데이터 흐름을 반대로 지원해야 합니다. 계층 구조 안에 있는 폼 컴포넌트들은 `FilterableProductTable`의 상태를 업데이트해야 합니다.

React는 이 데이터 흐름을 명시적으로 만들어주지만, 두 방향 데이터 바인딩보다 조금 더 많은 타이핑을 필요로 합니다. 위 예제에서 입력란을 입력하거나 체크박스를 선택하려고 하면 React가 입력을 무시하는 것을 볼 수 있습니다. 이것은 의도된 동작입니다. `<input value={filterText} />`와 같이 작성하면 input의 value prop이 항상 FilterableProductTable에서 전달된 filterText 상태와 동일하게 설정됩니다. filterText 상태가 변경되지 않으므로 입력란이 변경되지 않습니다.

사용자가 폼 입력을 변경할 때마다 상태가 해당 변경을 반영하도록 하려고 합니다. 상태는 `FilterableProductTable`이 소유하고 있으므로, `SearchBar`가 `FilterableProductTable`의 상태를 업데이트할 수 있도록 이러한 함수들을 SearchBar로 전달해야 합니다.

```
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

SearchBar 내부에서 onChange 이벤트 핸들러를 추가하고, 이를 통해 부모의 상태를 설정할 것입니다:

```
<input 
  type="text" 
  value={filterText} 
  placeholder="Search..." 
  onChange={(e) => onFilterTextChange(e.target.value)} />
```

이제 어플리케이션이 동작합니다!

<details>
<summary>App.js</summary>

```
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

```
</details>

["Adding Interactivity"](https://react.dev/learn/adding-interactivity) 섹션에서 이벤트 처리와 상태 업데이트에 대해 자세히 알아볼 수 있습니다.