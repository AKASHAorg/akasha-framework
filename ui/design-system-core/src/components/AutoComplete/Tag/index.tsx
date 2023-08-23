import React from 'react';
import Card from '../../Card';
import Stack from '../../Stack';
import Text from '../../Text';
import Button from '../../Button';
import Icon from '../../Icon';

type TagProps = {
  tag: string;
  onRemove: () => void;
};

const Tag: React.FC<TagProps> = props => {
  const { tag, onRemove } = props;
  return (
    <Card key={tag} radius={10} padding={4} accentBorder>
      <Stack align="center" spacing="gap-x-1">
        <Text variant="body2" weight="light" truncate>
          {tag}
        </Text>
        <Button onClick={onRemove} plain>
          <Icon type="XCircleIcon" size="sm" accentColor />
        </Button>
      </Stack>
    </Card>
  );
};

export default Tag;
