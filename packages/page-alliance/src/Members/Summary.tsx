// Copyright 2017-2023 @polkadot/app-alliance authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Member as MemberType, Rule } from '../types';

import React from 'react';

import { CardSummary, SummaryBox } from '@polkadot/react-components';
import { useIpfsLink } from '@polkadot/react-hooks';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  members?: MemberType[];
  rule?: Rule;
}

function Summary ({ className, members, rule }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const ipfsLink = useIpfsLink(rule && rule.cid && rule.cid.ipfs);

  return (
    <SummaryBox className={className}>
      <CardSummary label={t<string>('rule')}>
        {rule
          ? rule.hasRule
            ? ipfsLink
              ? (
                <a
                  href={ipfsLink.ipfsUrl}
                  rel='noopener noreferrer'
                  target='_blank'
                >{ipfsLink.ipfsShort}</a>
              )
              : t<string>('yes')
            : t<string>('no')
          : <span className='--placeholder'>{t<string>('no')}</span>
        }
      </CardSummary>
      <CardSummary label={t<string>('members')}>
        {members
          ? formatNumber(members.length)
          : <span className='--placeholder'>99</span>
        }
      </CardSummary>
    </SummaryBox>
  );
}

export default React.memo(Summary);
