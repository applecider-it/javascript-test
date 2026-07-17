<script setup lang="ts">
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

function getTimezoneOffsetString() {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(offset) % 60).padStart(2, '0');

  return `${sign}${hours}:${minutes}`;
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const list = [
  '2026-07-17T00:10:20',
  '2026-07-17 00:10:20',
  '2026-07-17T00:10:20Z',
  '2026-07-17T00:10:20+09:00',
  '2026-07-17T00:10:20+08:00',
];
</script>

<template>
  <div>
    日付関数動作確認
    <div>TimeZone: {{ timezone }}</div>
    <div>TimeZone Offset: {{ getTimezoneOffsetString() }}</div>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              str
            </th>
            <th
              colspan="2"
              class="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              toLocaleString() ja-JP de-DE
            </th>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              format
            </th>
            <th
              colspan="2"
              class="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              UTC toLocaleString() ja-JP de-DE
            </th>
            <th
              class="border border-gray-300 px-4 py-2 text-left font-semibold"
            >
              UTC format
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="str in list"
            :key="str"
            class="hover:bg-gray-50 even:bg-gray-50"
          >
            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{ str }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{ new Date(str).toLocaleString() }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{ new Date(str).toLocaleString('de-DE') }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{ format(new Date(str), 'yyyy年MM月dd日 HH時mm分ss秒') }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{
                new Date(str).toLocaleString('ja-JP', {
                  timeZone: 'UTC',
                })
              }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{
                new Date(str).toLocaleString('de-DE', {
                  timeZone: 'UTC',
                })
              }}
            </td>

            <td class="border border-gray-300 px-4 py-2 font-mono">
              {{
                formatInTimeZone(
                  new Date(str),
                  'UTC',
                  'yyyy年MM月dd日 HH時mm分ss秒',
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
