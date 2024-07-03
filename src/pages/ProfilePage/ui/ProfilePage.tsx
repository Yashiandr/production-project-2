import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Text,
    TextAlign,
    TextTheme,
} from '@/shared/ui/Text/Text';
import { Page } from '@/widgets/Page';
import { ProfileRating } from '@/features/profileRating';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const {
        className,
    } = props;
    const { id = '#' } = useParams<{ id: string }>();
    const { t } = useTranslation('profile');

    if (!id) {
        return <Text title={t('Профиль не найдет')} align={TextAlign.CENTER} theme={TextTheme.ERROR} />;
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard id={id} />
            <ProfileRating profileId={id} />
        </Page>
    );
};

export default ProfilePage;
