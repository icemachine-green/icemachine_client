/**
 * @file src/constants/servicePolicy.js
 * @description 서비스 정책 데이터 상수
 */

export const SERVICE_POLICIES = [
  {
    id: 1,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 방문 점검",
    duration: 60,
    price: 30000,
  },
  {
    id: 2,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 기본 청소",
    duration: 60,
    price: 50000,
  },
  {
    id: 3,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 집중 청소",
    duration: 120,
    price: 80000,
  },
  {
    id: 4,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 방문 점검",
    duration: 60,
    price: 40000,
  },
  {
    id: 5,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 기본 청소",
    duration: 60,
    price: 60000,
  },
  {
    id: 6,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 집중 청소",
    duration: 120,
    price: 100000,
  },
  {
    id: 7,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 프리미엄 청소",
    duration: 180,
    price: 150000,
  },
  {
    id: 8,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 방문 점검",
    duration: 60,
    price: 50000,
  },
  {
    id: 9,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 기본 청소",
    duration: 120,
    price: 100000,
  },
  {
    id: 10,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 집중 청소",
    duration: 180,
    price: 180000,
  },
  {
    id: 11,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 프리미엄 청소",
    duration: 240,
    price: 250000,
  },
];

/**
 * ID를 키로 사용하는 객체 형태 (상세 페이지에서 검색용)
 * 예: SERVICE_POLICY_MAP[1] -> { id: 1, name: "소형..." }
 */
export const SERVICE_POLICY_MAP = SERVICE_POLICIES.reduce((acc, policy) => {
  acc[policy.id] = policy;
  return acc;
}, {});
